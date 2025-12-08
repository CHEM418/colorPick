const asyncHandler = require("express-async-handler");
const Score = require("../models/scoreModel");


// [각 스테이지가 끝나면 결과 저장]
const gameStageResult = asyncHandler(async(req, res)=>{
    const{userId,username,time,stageId}=req.body ;
    if(!userId||!username||!time||!stageId){
        return res.status(400).json({message:"아이디, 닉네임, 시간, 스테이지 기록이 필요합니다."});
    }
    await Score.findOneAndUpdate(
        {userId, username, stageId},
        {$set:{time}},{upsert: true, new:true} //방금 기록 덮어 쓰기,없으면 추가
    );
    res.status(200).json({message:"최근 기록이 저장됐습니다."})
});


// [최고기록 저장]
const gameResult = asyncHandler(async(req,res)=>{
    const {userId,username,time} = req.body; //프론트에서 보내준 값

    if(!userId || !username||!time){ //입력값
        return res.status(400).json({message:"아이디, 닉네임, 최고 기록이 필요합니다."}); 
    }

    let exists=await Score.findOne({userId,username,stageId:0});//0번은 최고 기록
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
            stageId:0,
            time
        });
        newRecord=true;
        exists=newUser;

    }

    res.json({
        success: true,
        username,
        time,
        stageId:0,
        newRecord,
    });
    
});

module.exports={gameResult,gameStageResult};
//오류 => 어싱크 핸들러로 오류 던지고 errorhandler.js에서 처리
