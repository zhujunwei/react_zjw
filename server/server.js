import React from 'react';
import {renderToString} from 'react-dom/server';

const express = require('express');
const userRouter = require('./user');
const fileRouter = require('./fileOperate');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const models = require('./model');
const Chat = models.getModel('chat');
const errhandler = require('./errorHandler');//错误处理中间件
const userOperate = require('./user_operate');
//新建app
const app = express();
//work with express
const server = require('http').Server(app);
const io = require('socket.io')(server);
const path = require('path');


io.on('connection',function(socket){
    socket.on('sendmsg',function(data){
        const {from,to,msg} = data;
        const chatid = [from,to].sort().join('_');
        Chat.create({chatid,from,to,content:msg},function(err,doc){
            io.emit('recvmsg',Object.assign({},doc._doc));
        })
    })
})

app.use(cookieParser()) //解析cookie
app.use(bodyParser.urlencoded({ extended: true })); //解析form表单
app.use(bodyParser.json()); //解析post参数
app.use(morgan('short'))

app.use(function(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
	next();
});


//登录拦截器
app.all('/*', function(req, res, next){
    // console.log('-------------------------')
    // console.log(req.headers)
    // console.log(req.path)
    if(req.path === '/user/login' || req.path === '/user/register') return next();
    var authorization = req.headers.authorization;
    if(!!authorization){
        userOperate.checkAuthorization(authorization,next);
    }else{
        return next({
            statusCode:403,
            err:'用户认证失败'
        })
    }
    
});

//使用中间件,/user路径下面
app.use('/user',userRouter);
app.use('/upload',fileRouter);

// 设置静态资源
// app.use(function(req,res,next){
//     if(req.url.startsWith('/user/') || req.url.startsWith('/static/')){
//         return next()
//     }
//     function App(){
//         return(
//             <div>
//                 <p>aaaaa</p>
//                 <p>ssss</p>
//             </div>
//         )
//     }
//     const htmlRes = renderToString(<App></App>)
//     res.send(htmlRes);
//     // console.log(renderToString(App()))
//     // return res.sendFile(path.resolve('build/index.html'));
// })
// app.use('/',express.static(path.resolve('build')))
app.use(errhandler())
server.listen(9093,function(){
    console.log('服务启动与 9093')
})