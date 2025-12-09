const express = require("express");
const router = express.Router();
const {gameResult,gameStageResult,getStage} = require('../controllers/gameController');


router.get(['/', '/home', '/index'], (req, res)=> {
    res.render('index', {pageName: 'index'});
});

router.get(['/games/stage', '/stage'],getStage);

    //**게임 기록 저장 코드 (POST)**//

router.get('/game:gameId', (req, res)=>{ /*게임 페이지 동적 라우팅*(스테이지 1,2,3을 같은 game.ejs에서 해결위함*/
    const gameId = req.params.gameId;
    res.render('games/game',{ pageName: 'game' + gameId, stageId: gameId });

});

router.get('/ranking', (req, res) => {
    res.render('ranking', {pageName: 'ranking'});
});

//api 연결
router.post('/api/save-record', gameStageResult); //개별 기록 저장(game.ejs)
router.post('/api/save-total-time',gameResult); //총합 랭킹 저장(ranking.ejs)

module.exports = router;
