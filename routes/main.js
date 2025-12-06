const express = require("express");
const router = express.Router();


router.get(['/', '/home', '/index'], (req, res)=> {
    res.render('index', {pageName: 'index'});
});


router.get(['/games/stage', '/stage'], (req, res,next)=>{
    try{
        // **DB에서 기록을 불러오는 로직 구현 필요해요!** //
        //여기
        
        res.render('games/stage', {pageName: 'stage'});

    } catch(err){
        next(err); //에러핸들러로 처리
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
