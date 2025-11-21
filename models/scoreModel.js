const mongoose = require("mongoose");

const scoreSchema = new mongoose.Schema({
    userId:{ //아이디(중복X)
        type: String,
        required: true,
        unique: true,
    },
    nickname:{ //닉네임(중복O)
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

const Score = mongoose.model("Score",scoreSchema); //Score 모델 생성
module.exports = Score;
