import React from 'react';
import {Route ,Switch} from 'react-router-dom'
import { NavBar } from 'antd-mobile';
import {connect } from 'react-redux';
import NavLinkBar from '../navlink/navlink';
import  Boss from '../boss/boss';

function genius(){
    return <h2>genius</h2>
}
function Msg(){
    return <h2>Msg</h2>
}
function User(){
    return <h2>User</h2>
}

@connect(
    state=>state
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

    render(){
        const userInfo = this.props.user;
        console.log(userInfo)
        const {pathname} = this.props.location;
        const navList = [
            {
                path:'/boss',
                text:'牛人',
                icon:'boss',
                title:'牛人列表',
                component:Boss,
                hide:userInfo.type == 'genuis'
            },{
                path:'/genius',
                text:'boss',
                icon:'job',
                title:'Boss列表',
                component:genius,
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
        ]

        return (
            <div>
                <NavBar className="fixd-header" mode="dark">{navList.find(v=> v.path == pathname).title}</NavBar>
                <div style={{marginTop:45}}>
                    <Switch>
                        {navList.map(v=>(
                            <Route path={v.path} key={v.path} component={v.component} />
                        ))}
                    </Switch>
                </div>
                <NavLinkBar data={navList}></NavLinkBar>
                {/*<Route path="/boss" component={Boss}>*/}
                    {/**/}
                {/*</Route>*/}
            </div>
        )
    }
}