const express = require('express');
const Router = express.Router();
const models = require('./model');
const userToken = models.getModel('user_token');
const User = models.getModel('user');
const UUID = require('uuid');
const fs = require('fs');
const formidable = require('formidable');
const cacheFolder = 'public/images/';


Router.post('/avatar',function(req,res,next){
    var userDirPath =cacheFolder+ "avatar";
    if (!fs.existsSync(userDirPath)) { //判断是否有头像
        fs.mkdirSync(userDirPath);
    }
    var form = new formidable.IncomingForm(); //创建上传表单
    form.encoding = 'utf-8'; //设置编辑
    form.uploadDir = userDirPath; //设置上传目录
    form.keepExtensions = true; //保留后缀
    form.maxFieldsSize = 2 * 1024 * 1024; //文件大小
    form.type = true;
    
    var displayUrl;
    
    form.parse(req, function(err, fields, files) {
        if (err) {
            return res.json(err);
        }
        var extName = ''; //后缀名
        console.log(files);
        console.log(files.file);
        switch (files.file.type) {
            case 'image/pjpeg':
                extName = 'jpg';
                break;
            case 'image/jpeg':
                extName = 'jpg';
                break;
            case 'image/png':
                extName = 'png';
                break;
            case 'image/x-png':
                extName = 'png';
                break;
        }
        console.log('extName:',extName)
        if (extName.length === 0) {
            return  res.json({
                code:-1,
                msg: '只支持png和jpg格式图片'
            });
        } else {
            var avatarName = '/' + Date.now() + '.' + extName;
            var newPath = form.uploadDir + avatarName;
            fs.renameSync(files.file.path, newPath); //重命名
            return res.json({
                code:0,
                msg: '上传成功'
            });
        }
    });

    form.on('end',function(){
        console.log('upload success')
    })
    form.on('error', function(err,doc) {
        console.log('上传文件报错',err)
    })
})

module.exports = Router;