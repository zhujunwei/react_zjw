const express = require('express');
const userRouter = require('./user');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

//新建app
const app = express();

app.use(cookieParser()) //解析cookie
app.use(bodyParser.json()); //解析post参数
//使用中间件,/user路径下面
app.use('/user',userRouter);

app.listen(9093,function(){
    console.log('服务启动与 9093')
})