//const express = require('express);// express 함수
//const app = express();
//위 두개를 합쳐서 쓴것.

const app = require('express')();


app.get()





/*
app.get("/", (req, res, next) => {
    // 미들웨어는 request 요청 데이터 분석 -> 분석 -> response 객체 출력
    const text = req.url + ":" + req.method;

    return res.send(text);
})
*/

/*
app.get("/", (req,res,next) => {
    console.log("첫번째 미들웨어");
    next()
})

app.get("/", (req,res,next) => {
    console.log("두번째 미들웨어");
    next();
})

app.get("/", (req,res) => {
    return res.send("세번째 미들웨어");
})
*/

app.listen(3000, () => {
    console.log("서버 대기중...");
})