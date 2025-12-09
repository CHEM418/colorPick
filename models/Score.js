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
    time: { //걸린 시간
            type: Number,
            required: true,
        },
    stageId:{ //*stageId 0번의 time은 최고 기록 저장 공간
        type:Number,
    }
},
    {timestamps: true});

scoreSchema.index({userId:1,username:1,stageId:1},{unique:true});//닉네임+id+스테이지 별로 기록

const Score = mongoose.model("Score",scoreSchema);
module.exports = Score;

