/**
 * user相关 的接口
 * @type {*|createApplication}
 */
const express = require('express');
const Router = express.Router();
const models = require('./model');
const User = models.getModel('user');
const utils = require('utility');
const _filter = {'pwd':0,'__v':0}; //过滤 密码，版本号

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

        // User.create(,function(e,d){
        //     if(e){
        //         return res.json({code:1,msg:'系统错误'});
        //     }else{
        //         //把信息写入cookie
        //
        //     }
        // })
    })
});
//登录
Router.post('/login',function (req,res) {
    const {user,pwd} = req.body;
    User.findOne({user,pwd:md5Pwd(pwd)},_filter,function(err,doc){
        if(!doc){
            return res.json({code:1,msg:'用户名或密码错误'});
        }else{
            //设置cookie
            res.cookie('userid', doc._id);
            return res.json({code:0,data:doc});
        }
    })
});

Router.get('/info',function (req,res) {
    const {userid} = req.cookies;
    if(!userid){
        return res.json({code:1});
    }else{
        User.findOne({_id:userid},_filter,function(err,doc){
            if(err){
                return res.json({code:1,msg:'系统异常'});
            }
            if(doc) {
                return  res.json({code:0,data:doc});
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
    console.log(111);
    //查找更新
    User.find({type},function(err,doc){
        return res.json({code:0,data:doc});
    })
});

function md5Pwd(pwd){
    const salt = 'zhujunwei_is_good';
    return utils.md5(utils.md5(salt+pwd));
}

module.exports = Router;