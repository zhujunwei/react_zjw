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
Router.get('/list',function (req,res) {
    User.find({},function(err,doc){
        console.log(doc)
        return res.json(doc)
    })
});

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


function md5Pwd(pwd){
    const salt = 'zhujunwei_is_good';
    return utils.md5(utils.md5(salt+pwd));
}

module.exports = Router;