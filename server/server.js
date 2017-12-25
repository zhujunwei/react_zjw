const express = require('express');
const userRouter = require('./user');

//新建app
const app = express();
//使用中间件,/user路径下面
app.use('/user',userRouter);

app.listen(9093,function(){
    console.log('服务启动与 9093')
})