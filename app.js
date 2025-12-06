//환경정보 라이브러리 읽어오기
require('dotenv').config();

//라이브러리 불러오기
const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const dbConnect = require("./config/dbConnect");
const errorhandler = require("./errorhandler");
const cron = require("node-cron");
const Score = require('./models/scoreModel');
const {gameResult} = require('./controllers/gameController');

//app 서버 생성
const app = express();

//포트번호 설정(PORT변수를 사용하거나 3000번 사용)
const port = process.env.PORT || 3000;

//db 연결
dbConnect();

//미들웨어 등록
//GET "/" 요청 처리
app.use(express.json()); //바디 파서
app.use(express.urlencoded({extended: true}));
app.use(express.static("public")); //정적 파일의 경로 알려줌
app.use("/", require("./routes/main")); //main파일 내 라우터가 미들웨어를 처리하도록 함

//결과 저장 api
app.post('/api/save-record', gameResult);


//ejs엔진 사용 설정
app.set("view engine", "ejs"); //엔진 선택
app.set("views", "./views") //뷰 화면 폴더 지정
app.set("layout", './layouts/mainLayouts');
app.use(expressLayouts);


//에러 핸들러 미들웨어 등록
app.use(errorhandler);

//정기적으로 데이터 삭제(분/시/일/월/요일)
cron.schedule('0 0 * * *',async()=>{ //매일 자정에 삭제
        try{
            await Score.deleteMany({});
            console.log(`점수 데이터가 초기화 되었습니다.`);
        } catch(err){ 
            console.log(`점수 데이터가 초기화에 실패했니다.`,err);//에러 정보
        }
});

//서버 대기
app.listen(port, ()=>{
    console.log(`App listening on port ${port}`);
});
