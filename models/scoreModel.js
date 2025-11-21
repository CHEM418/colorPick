const mongoose = require("mongoose");

const scoreSchema = new mongoose.Schema({
    userId:{
        type: String,
        required: true,
    },
    score:{
        type: Number,
    },
},
    {
        timestamps: {
            type: Number,
        },
    },
);
//
const Score = mongoose.model("Score",scoreSchema); //Score 모델 생성
module.exports = Score;