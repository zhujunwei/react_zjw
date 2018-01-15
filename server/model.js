const mongoose = require('mongoose');
//链接mongo
const DB_URL = 'mongodb://localhost:27017/imooc-chat';
mongoose.connect(DB_URL);
mongoose.connection.on('connected',function(){
    console.log('mongo connect success');
});
//建立模型
const models = {
    user:{
        'user':{ type:String, require:true},
        'pwd':{ type:String, require:true},
        'type':{ type:String, require:true},
        'avatar':{ type:String}, //头像 来判断是否完善信息了
        'desc': {type : String},  //简介
        'title': { type:String}, //职位
        'company': { type: String},//公司 boss
        'money': {type : String},
        'token':{type:String,require:true},
        'userId':{type:String,require:true} //用户的userId
    },
    chat:{
        'chatid':{type:String,isRequired:true},
        'from':{type:String,require:true},
        'to':{type:String,require:true},
        'read':{type:Boolean,default:false},
        'content':{type:String,require:true,default:''},
        'create_time':{type:Number,default:Date.now()}
    },
    user_token:{ //token保存的表
        'userId':{type:String,require:true},
        'access_token':{type:String,require:true},
        'token_effective':{ type:Date,require:true, default:Date.now }
    }
}


//建立模型
for(let m in models){
    mongoose.model(m,new mongoose.Schema(models[m]));
}

module.exports = {
    getModel:function(name){
        return mongoose.model(name);
    }
}