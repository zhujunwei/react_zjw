import React from 'react';
import Logo from '../../component/logo/logo'
import { List, InputItem, WhiteSpace ,WingBlank, Button} from 'antd-mobile';
import { login , clearMsg } from '../../redux/user.redux';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import ZForm from '../../component/z-form/z-form'


@connect(
    state => state.user,
    {login , clearMsg}
)
@ZForm
export  default  class Login extends React.Component{
    constructor(){
        super();
        this.state = {
            user:"",
            pwd:""
        }
    }
    register(){
        console.log(this.props);
        this.props.clearMsg();
        this.props.history.push('/register')
    }

    handleLogin(){
        this.props.login(this.props.state);
    }
    render(){
        return (
            <div>

                {this.props.redirectTo && this.props.redirectTo != '/login' ? <Redirect to={this.props.redirectTo} /> : null}
                <Logo></Logo>
                <WingBlank>
                    <List>
                        <InputItem
                            onChange={v=>{this.props.handleChange('user',v)}}>用户名</InputItem>
                        <InputItem
                            onChange={v=>{this.props.handleChange('pwd',v)}}>密码</InputItem>
                    </List>
                    {this.props.msg?<p className='error-msg'>{this.props.msg}</p>:null}
                    <WhiteSpace></WhiteSpace>
                    <Button type='primary' onClick={this.handleLogin.bind(this)}>登录</Button>
                    <WhiteSpace></WhiteSpace>
                    <Button type='primary' onClick={this.register.bind(this)}>注册</Button>
                </WingBlank>
            </div>
        )
    }
}