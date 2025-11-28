const mongoose = require("mongoose");

const scoreSchema = new mongoose.Schema({
    userId:{ //아이디
        type: String,
        required: true,
    },
    username:{ //닉네임
        type: String,
        required: true,
    },
    highscore:{ //최고 점수
        type: Number,
        required: true,
    },
    time: { //걸린 시간
            type: Number,
            required: true,
        },
    },
    {timestamps: true} //
);

scoreSchema.createIndex({userID:1,username:1},{unique:true}); //아이디-닉네임 묶어서 유니크

const Score = mongoose.model("Score",scoreSchema);
module.exports = Score;
