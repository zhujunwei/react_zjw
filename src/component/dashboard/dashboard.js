import React from 'react';
import {Route ,Switch} from 'react-router-dom'
import { NavBar } from 'antd-mobile';
import {connect } from 'react-redux';
import NavLinkBar from '../navlink/navlink';
import  Boss from '../boss/boss';
import  Genuis from '../genuis/genuis';
import  User from '../user/user';
import  Msg from '../msg/msg';
import {getMsgList,recvMsg} from '../../redux/chat.redux';
import QueueAnim from 'rc-queue-anim';


@connect(
    state=>state,
    {getMsgList,recvMsg}
)
export  default class Dashboard extends React.Component{
    constructor(){
        super();
        this.state = {
            title:'',
            avatar:"",
            desc:''
        }
    }

    componentDidMount(){
        if(!this.props.chat.chatmsg.length){
            this.props.getMsgList();
            this.props.recvMsg();
        }

    }

    render(){
        const userInfo = this.props.user;
        // console.log('userInfo',userInfo);
        const {pathname} = this.props.location;
        // console.log('pathname:'+pathname);
        const navList = [
            {
                path:'/boss',
                text:'牛人',
                icon:'boss',
                title:'牛人列表',
                component:Genuis,
                hide:userInfo.type == 'genuis'
            },{
                path:'/genius',
                text:'boss',
                icon:'job',
                title:'Boss列表',
                component:Boss,
                hide:userInfo.type == 'boss'
            },{
                path:'/msg',
                text:'消息',
                icon:'msg',
                title:'消息列表',
                component:Msg,

            },{
                path:'/me',
                text:'我',
                icon:'user',
                title:'个人中心',
                component:User,

            }
        ];
        const page = navList.find(v=>v.path == pathname);
        console.log(page)
        // 让动画生效，值渲染一个router
        return (
            <div>
                <NavBar className="fixd-header" mode="dark">{navList.find(v=> v.path == pathname).title}</NavBar>
                <div className="dashboard-container">
                    <QueueAnim>
                        <Route path={page.path} key={page.path} component={page.component} />
                    </QueueAnim>
                </div>
                <NavLinkBar data={navList}></NavLinkBar>
            </div>
        )
    }
}