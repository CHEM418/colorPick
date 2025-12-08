const express = require("express");
const router = express.Router();


router.get(['/', '/home', '/index'], (req, res)=> {
    res.render('index', {pageName: 'index'});
});


router.get(['/games/stage', '/stage'], async(req, res,next)=>{
    try{
        const currentUser = req.user; //지금 유저 정보
        let stageTime = []; //각 스테이지 기록 배열 저장

        if(currentUser){
            stageTime = await Score.find({//모든 stage 기록 찾아오기
                userId: currentUser.id,
                username: currentUser.username
            }).sort({stageId:1});
        }
        // @@@ ejs에서 stageTime배열 stageId 확인하시고 쓰시면 돼요! @@@
        res.render('games/stage', {pageName: 'stage',stageTime:stageTime});
    } catch(err){
        next(err); //에러핸들러
    }
});

    //**게임 기록 저장 코드 (POST)**//

router.get('/game:gameId', (req, res)=>{ /*게임 페이지 동적 라우팅*(스테이지 1,2,3을 같은 game.ejs에서 해결위함*/
    const gameId = req.params.gameId;
    res.render('games/game',{ pageName: 'game' + gameId, stageId: gameId });

});

router.get('/ranking', (req, res) => {
    res.render('ranking', {pageName: 'ranking'});
});

module.exports = router;
