const express = require('express');
const userRouter = require('./user');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const models = require('./model');
const Chat = models.getModel('chat');
//新建app
const app = express();
//work with express
const server = require('http').Server(app);
const io = require('socket.io')(server);

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
app.use(bodyParser.json()); //解析post参数
//使用中间件,/user路径下面
app.use('/user',userRouter);

server.listen(9093,function(){
    console.log('服务启动与 9093')
})