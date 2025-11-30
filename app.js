const express = require("express");
const dbConnect = require("./config/dbConnect");
const errorhandler = require("./errorhandler");
const methodoverride = require("method-override");
const cron = require("node-cron");
const app = express();
const port = 3000;

dbConnect(); //db 연결
app.set("view engine","ejs"); // 뷰 엔진 설정
app.set("views","./views");
app.use(express.static("./public")); //정적 파일 폴더 등록
app.use(methodoverride("_method")); //메소드 오버라이드
app.use(express.json());  //바디 파서 미들웨어 
app.use(express.urlencoded({extended: true}));


//----미완----
// 메인화면(홈) 구현 필요
app.get("/home",(req,res)=>{
    //res.render("home");
});
//----------

app.use("/game", require("./routes/gameRoutes")); //라우터 등록
app.use(errorhandler);  //에러 핸들러 미들웨어 등록

//정기적으로 데이터 삭제(분/시/일/월/요일)
cron.schedule('0 0 * * *',async()=>{ //매일 자정에 삭제

        try{
            await Score.deleteMany({});
            console.log(`점수 데이터가 초기화 되었습니다.`);
        } catch(err){ 
            console.log(`점수 데이터가 초기화에 실패했니다.`,err);//에러 정보
        }

});

app.listen(port,()=>{
    console.log(`${port}번 포트에서 서버 실행 중`);
});
