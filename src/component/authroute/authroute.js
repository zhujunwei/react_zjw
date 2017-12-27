import React from 'react';
import axios from 'axios';
import {withRouter} from 'react-router-dom';
import { loadData } from '../../redux/user.redux';
import { connect } from 'react-redux';

//这不是一个路由组件所有不能再props中获取到路由对象，使用withRouter就可以使用了
@withRouter
@connect(
    state=>state.user,
    {loadData}
)
export  default  class AuthRoute extends React.Component{
    componentDidMount(){
        const publicList = ['/login','/register'];
        const pathName = this.props.location.pathname;

        if(publicList.indexOf(pathName) > -1){
            //判断是否在登录或者注册页面，就不需要获取用户信息了
            return null;
        }
        //获取用户信息
        axios.get('/user/info')
            .then(res=>{
                if(res.status == 200){
                    if(res.data.code === 0){
                        //有登录信息
                        this.props.loadData(res.data.data);
                    }else{

                        this.props.history.push('/login');
                    }
                    console.log(res.data);
                }
            })
    }
    render(){
        return null
    }
}