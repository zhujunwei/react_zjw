import axios from 'axios';
import { getRedirectPath } from '../util';
import {withRouter} from 'react-router-dom'
const ERROR_MSG = 'ERROR_MSG';  //错误消息
const LOAD_DATA = 'LOAD_DATA';  //获取用户信息
const CLEAR_MSG = 'CLEAR_MSG';  //清楚msg
const AUTH_SUCCESS = 'AUTH_SUCCESS'; //登录注册成功
const LOGOUT = 'LOGOUT'; //登录注册成功
const initState = {
    msg:'',
    isAuth:false,
    user:'',
    pwd:'',
    type:'',
    token:''
} //初始化数据


//reducer
export function user(state=initState,action){

    switch (action.type){
        case AUTH_SUCCESS:
            return{...state,msg:'',redirectTo:getRedirectPath(action.payload) ,...action.payload,pwd:''};

        case LOAD_DATA:
            return{...state,msg:'',isAuth:true,...action.payload};
        case CLEAR_MSG:
            return{...state,msg:'',redirectTo:""};

        case ERROR_MSG:
            return{...state,msg:'',isAuth:false,msg:action.msg};

        case LOGOUT:
            return{...initState,redirectTo:'/login'};

        default:
            return state;
    }
}

//用户登录
export function login({user,pwd}){
    if(!user || !pwd ){
        return errorMsg('用户名密码必须输入');
    }
    return dispatch=>{
        axios.post('/user/login',{user,pwd})
            .then(res=>{
                console.log('登录成功,',res);
                if(res.status === 200 && res.data.code == 0){
                    dispatch(authSuccess(res.data))
                }else{
                    dispatch(errorMsg((res.data.msg)));
                }
            })
    }
}
//用户注册
export function register({user,pwd,repeatpwd,type}){
    if(!user || !pwd || !type){
        return errorMsg('用户名密码必须输入');
    }
    if(pwd !== repeatpwd){
        return errorMsg('密码和确认密码不同');
    }
    return dispatch=>{
        axios.post('/user/register',{user,pwd,type})
            .then(res=>{
                if(res.status === 200 && res.data.code == 0){
                    dispatch(authSuccess({user,pwd,type}))

                }else{
                    dispatch(errorMsg((res.data.msg)));
                }
            })
    }

}
//页面刷新数据获取
export function loadData(userInfo){
    console.log(userInfo)
    return { type :LOAD_DATA , payload:userInfo};
    //获取用户信息

}
export function clearMsg(){
    return { type : CLEAR_MSG}
}
//注册 登录成功
function authSuccess(obj){
    const {data:{pwd,...datas},token} = obj;
    localStorage.setItem('token',token);
    let newData = {...datas,token};
    return {type:AUTH_SUCCESS,payload:newData};
}


function errorMsg(error){
    return {msg:error , type:ERROR_MSG}
}

//更新用户信息
export function update(data){
    return dispatch=>{
        axios.post('/user/update',data)
            .then(res=>{
                if(res.status === 200 && res.data.code == 0){
                    dispatch(authSuccess(res.data.data))
                }else{
                    dispatch(errorMsg((res.data.msg)));
                }
            })
    }
}

//注销登录
export function logoutSubmit(){
    return {type:LOGOUT}
}