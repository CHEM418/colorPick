const mongoose = require("mongoose");

const ScoreSchema = new mongoose.Schema({
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
    stageId:{ // ***stageId가 0일 때의 time은 최고 기록이에요!
        type:Number,
    }
},
    {timestamps: true});

ScoreSchema.index({userId:1,username:1,stageId:1},{unique:true});//닉네임+id+스테이지 별로 기록


module.exports = mongoose.model("Score",ScoreSchema);

