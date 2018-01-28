import axios from 'axios';
import { Toast} from 'antd-mobile';
import {withRouter} from 'react-router-dom';


//请求头设置
axios.interceptors.request.use(function (config) {    // 这里的config包含每次请求的内容  
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.authorization = token;
    }
    return config;
}, function (err) {
    return Promise.reject(err);
});

//拦截请求
axios.interceptors.request.use(function(config){
    Toast.loading('loading',0)
    return config
});

//拦截请求回应
axios.interceptors.response.use(function(config){
    Toast.hide();
    return config
},(err) => {
    Toast.hide();
    return Promise.reject(err)
})