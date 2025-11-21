const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    userId:{
        type: String,
        required: true,
        unique: true,
    }, //
    username:{
        type: String,
        required: true, 
    },
    highScore:{ 
        type: Number,
        defalut: 0,
    }
},

);

const User = mongoose.model("User",userSchema); //User 모델 생성
module.exports = User;