//[중요] 오류 처리 => 어싱크 핸들러로 오류 던지고 errorhandler.js에서 처리

const asyncHandler = require("express-async-handler");
const Score = require("../models/scoreModel");

/* const ex = asyncHandler(async(req,res)=>{
    res.render("getAll"); ejs등록 예시
    res.render(ejs파일,{변수:전송 자료}) 변수로 값 사용
}); */


// @POST /game/result
const gameResult = asyncHandler(async(req,res)=>{
    const {userId,username,score,time} = req.body; //프론트에서 보내준 값 (방금 게임한 결과)

    // 입력값
    if(!userId || !username){
        return res.status(400).json({message:"아이디와 닉네임을 입력해주세요."}); 
    }

    //기존 유저 찾기
    let exists=await Score.findOne({userId,username});
    let newHighscore=false; //새 기록 세웠는지 여부

    if(exists){//기존 유저: 업데이트
        if(score>exists.highscore){
            exists.highscore=score;
            exists.time=time;
            await exists.save();
            newHighscore=true;
        }
    } else{ //신규 유저: 생성
        const newScore = await Score.create({
            userId,
            username,
            highscore:score,
            time
        });
        exists=newScore;
        newHighscore=true;

    }
    // 게임 결과: 랭킹(최고 점수들 기준)
    const playerRank = await Score.countDocuments({highscore:{$gt:score}})+1;

    //게임 결과: 렌더링. 임시:gameResult.ejs
    res.render("gameResult",{
        username:username,
        score:score,
        time:time,
        newHighscore:newHighscore,//신기록 여부
        playerRank:playerRank //등수
    });
    
});


// @? /game/result/share


// @GET /game/ranking
const gameRanking = asyncHandler(async(req,res)=>{

    //점수 내림차순 정렬 상위 10명!
    const leaderboard = await Score.find({})
    .sort({highscore:-1,_id:1})
    .limit(10) 
    .select("username highscore");

    //기본 틀만 잡아주시면 랭킹 페이지는 내가 만들기
    res.render("ranking",{leaderboard});
});




module.exports={gameResult, gameRanking};
