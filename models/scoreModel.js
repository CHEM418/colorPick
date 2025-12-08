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
    time: { //걸린 시간(=최고 기록)
            type: Number,
            required: true,
        },
    stageId:{
        type:Number,
    }
},
    {timestamps: true});

scoreSchema.index({userId:1,username:1,stageId:1},{unique:true});//닉넴,아이디,스테이지별로 기록

const Score = mongoose.model("Score",scoreSchema);
module.exports = Score;



