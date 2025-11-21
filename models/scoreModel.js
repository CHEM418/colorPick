const mongoose = require("mongoose");

const scoreSchema = new mongoose.Schema({
    userId:{ //아이디
        type: String,
        required: true,
    },
    nickname:{ //닉네임
        type: String,
        required: true,
    },
    score:{ //최고 점수
        type: Number,
        required: true,
    },
},
    {
        time: { //걸린 시간
            type: Number,
            required: true,
        },
    },
    {timestamps: true} //
);

scoreSchema.index({userId:1,nickname:1},{unique:true}); //id-nickname 묶어서 처리

const Score = mongoose.model("Score",scoreSchema); //Score 모델 생성
module.exports = Score;
