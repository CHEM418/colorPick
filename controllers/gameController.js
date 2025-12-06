const asyncHandler = require("express-async-handler");
const Score = require("../models/scoreModel");


const gameResult = asyncHandler(async(req,res)=>{
    const {userId,username,time} = req.body; //프론트에서 보내준 값

    if(!userId || !username){ //입력값
        return res.status(400).json({message:"아이디와 닉네임을 입력해주세요."}); 
    }

    let exists=await Score.findOne({userId,username});
    var newRecord=false; //신기록 여부

    if(exists){//기존 유저: 업데이트
        if(time<exists.time){
            exists.time=time;
            await exists.save();
            newRecord=true;
        }
    } else{ //신규 유저: 생성
        const newUser = await Score.create({
            userId,
            username,
            time
        });
        newRecord=true;
        exists=newUser;

    }
    // 게임 결과 랭킹(최고 점수들 기준)
    const playerRank = await Score.countDocuments({time:{$lt:time}})+1;

    res.json({
        success: true,
        username,
        time,
        newRecord,
        playerRank
    });
    
});

module.exports={gameResult};
//오류 => 어싱크 핸들러로 오류 던지고 errorhandler.js에서 처리
