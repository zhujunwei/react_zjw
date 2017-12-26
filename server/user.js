/**
 * user相关 的接口
 * @type {*|createApplication}
 */
const express = require('express');
const Router = express.Router();
const models = require('./model');
const User = models.getModel('user');


Router.get('/list',function (req,res) {
    User.find({},function(err,doc){
        console.log(doc)
        return res.json(doc)
    })
});

Router.post('/register',function (req,res) {
    console.log(req.body.data);
    const {user,pwd,type} = req.body;
    User.findOne({user:user},function(err,doc){
        if(doc){
            return res.json({code:1,msg:'用户名重复'});
        }
        User.create({user,pwd,type},function(e,d){
            if(e){
                return res.json({code:1,msg:'系统错误'});
            }else{
                //把信息写入cookie
                return res.json({code:0});
            }
        })
    })
});


Router.get('/info',function (req,res) {
    return res.json({code:1});
});

module.exports = Router;