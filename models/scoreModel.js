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
    },
    {timestamps: true} //
);

scoreSchema.index({userId:1,username:1},{unique:true});

const Score = mongoose.model("Score",scoreSchema);
module.exports = Score;
