//[중요] 오류 처리 => 어싱크 핸들러로 오류 던지고 errorhandler.js에서 처리
//비동기 처리를 위해서 async, await 사용
const asyncHandler = require("express-async-handler");


/* const ex = asyncHandler(async(req,res)=>{
    res.render("getAll"); ejs등록 예시
    res.render(ejs파일,{변수:전송 자료}) 변수로 값 사용
}); */



//module.exports={createUser};