const express = require("express");
const dbConnect = require("./config/dbConnect");
const errorhandler = require("./errorhandler");
const methodoverride = require("method-override");
const app = express();
const port = 3000;

 //db 연결
dbConnect();

// 뷰 엔진 설정
app.set("view engine","ejs");
app.set("views","./views");

//정적 파일 폴더 등록
app.use(express.static("./public"));

//메소드 오버라이드
app.use(methodoverride("_method"));

//바디 파서 미들웨어 
app.use(express.json());  
app.use(express.urlencoded({extended: true}));

 //에러 핸들러 미들웨어 등록 dkwlr
//app.use(errorhandler);

//
app.listen(port,()=>{
    console.log(`${port}번 포트에서 서버 실행 중`);
});