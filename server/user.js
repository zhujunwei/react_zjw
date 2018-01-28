/**
 * user相关 的接口
 * @type {*|createApplication}
 */
const express = require('express');
const Router = express.Router();
const models = require('./model');
const User = models.getModel('user');
const Chat = models.getModel('chat');
const User_token = models.getModel('user_token');
const utils = require('utility');
const _filter = {'pwd':0,'__v':0}; //过滤 密码，版本号

const UUID = require('uuid');

Router.post('/register',function (req,res) {
    const {user,pwd,type} = req.body;
    User.findOne({user:user},function(err,doc){
        if(doc){
            return res.json({code:1,msg:'用户名重复'});
        }

        const userModel = new User({user,pwd:md5Pwd(pwd),type});
        userModel.save(function(e,d){
            if(e){
                return res.json({code:1,msg:'系统错误'});
            }
            const {user,type,_id} = d;
            res.cookie('userid', _id);
            return res.json({code:0,data:{user,type,_id}});
        })
    })
});
//登录
Router.post('/login',function (req,res) {
    const {user,pwd} = req.body;
    User.findOne({user,pwd:md5Pwd(pwd)},_filter,function(err,doc){
        if(!doc){
            return res.json({code:1,msg:'用户名或密码错误'});
        }else{
            let uuid = UUID.v4();
            User_token.findOne({userId:doc._id},function(err,r){
                console.log(r);
                if(!r){
                    var user_token = new User_token({
                            "userId":doc._id,
                            "access_token":uuid
                        });
                    user_token.save(function(err,doc2){
                        if(err){
                            console.log(err);
                        }else{
                            return res.json({code:0,data:doc,token:uuid});
                        }
                    })
                }else{
                    var date = Date.now() + 3600 * 24 * 2 * 1000;
                    User_token.update({"userId":doc._id},{$set:{"access_token":uuid,token_effective:date}},function(e,doc3){
                        if(!e){
                            return res.json({code:0,data:doc,token:uuid});
                        }
                    })
                    
                }
            })  
        }
    })
});

Router.get('/info',function (req,res) {
    const {authorization} = req.headers;
    if(!authorization){
        return res.json({code:1});
    }else{
        User_token.findOne({access_token:authorization},_filter,function(err,doc){
            if(err){
                return res.json({code:1,msg:'系统异常'});
            }
            if(doc) {
                console.log('doc',doc);
                const {userId} = doc;
                User.findOne({_id:userId},_filter,function(err,doc){
                    if(err){
                        return res.json({code:1,msg:'系统异常'});
                    }
                    if(doc) {
                        return  res.json({code:0,data:doc});
                    }
                })
            }
        })
        
    }
    return
});

//更新用户信息
Router.post('/update',function(req,res){
    const userid = req.cookies.userid;
    if(!userid){
        return res.json({code:1})
    }
    const body = req.body;
    //查找更新
    User.findByIdAndUpdate(userid,body,function(err,doc){
        const data = Object.assign({},{
            user:doc.user,
            type:doc.type
        },body);
        return res.json({code:0,data:data});
    })
});
//更新用户信息
Router.get('/list',function(req,res){
    const { type } = req.query;
    //查找更新
    User.find({type},function(err,doc){
        return res.json({code:0,data:doc});
    })
});


function md5Pwd(pwd){
    const salt = 'zhujunwei_is_good';
    return utils.md5(utils.md5(salt+pwd));
}

Router.get('/getmsglist',function(req,res){
    const user = req.cookies.userid;
    User.find({},function(e,userdoc){
        let users = {};
        userdoc.forEach(v=>{
            users[v._id] = {name:v.user,avatar:v.avatar}
        })
        Chat.find({'$or':[{from:user},{to:user}]},function(err,doc){
            if(!err){
                return res.json({code:0,msgs:doc,users:users});
            }
        })
    })
})

Router.post('/readmsg',function(req,res){
    const userid = req.cookies.userid;
    const { from } = req.body;
    Chat.update(
        {from,to:userid},
        {'$set':{read:true}},
        {'multi':true},function(err,doc){
        if(!err){
            return res.json({code:0,num:doc.nModified})
        }
        return res.json({code:1,msg:'修改失败'})
    })
})


module.exports = Router;