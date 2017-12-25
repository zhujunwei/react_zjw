/**
 * user相关 的接口
 * @type {*|createApplication}
 */
const express = require('express');
const Router = express.Router();

Router.get('/info',function (req,res) {
    return res.json({code:1});
});

module.exports = Router;