import axios from 'axios';
import { getRedirectPath } from '../util';
import {withRouter} from 'react-router-dom'
const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
const ERROR_MSG = 'ERROR_MSG';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOAD_DATA = 'LOAD_DATA';
const CLEAR_MSG = 'CLEAR_MSG'
const initState = {
    msg:'',
    isAuth:false,
    user:'',
    pwd:'',
    type:''
}


//reducer
export function user(state=initState,action){

    switch (action.type){
        case REGISTER_SUCCESS:
            return{...state,msg:'',redirectTo:getRedirectPath(action.payload) ,isAuth:true,...action.payload};

        case LOGIN_SUCCESS:
            return{...state,msg:'',redirectTo:getRedirectPath(action.payload) ,isAuth:true,...action.payload};

        case LOAD_DATA:
            return{...state,msg:'',isAuth:true,...action.payload};
        case CLEAR_MSG:
            return{...state,msg:''};

        case ERROR_MSG:
            return{...state,msg:'',isAuth:false,msg:action.msg};

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
                if(res.status === 200 && res.data.code == 0){
                    dispatch(loginSuccess(res.data.data))
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
                    dispatch(registerSuccess({user,pwd,type}))

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

function loginSuccess(data){
    return {type:LOGIN_SUCCESS,payload:data,redirectTo:''};
}

function errorMsg(error){
    return {msg:error , type:ERROR_MSG}
}
function registerSuccess(data){
    return {payload:data ,type:REGISTER_SUCCESS}
}

