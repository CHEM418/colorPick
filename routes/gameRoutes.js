const express = require("express");
const router = express.Router();

//
const {gameResult,gameRanking} = require("../controllers/gameController");


//실제로는 @/game
//router.route("/")


//실제로는 @/game/result
router.route("/result")
    .post(gameResult);


//실제로는 @/game/ranking
router.route("/ranking")
    .get(gameRanking);

//실제로는 @/game/reult/share
//router.route("/result/share")




module.exports = router;
