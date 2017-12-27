import React from 'react';
import Logo from '../../component/logo/logo'
import { List, InputItem, WhiteSpace ,WingBlank, Button} from 'antd-mobile';
import { login , clearMsg } from '../../redux/user.redux';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

@connect(
    state => state.user,
    {login , clearMsg}
)

class Login extends React.Component{

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

    handleChange(key,value){
        this.setState({
            [key]:value
        })
    }

    handleLogin(){
        this.props.login(this.state);
    }
    render(){
        return (
            <div>
                {this.props.redirectTo ? <Redirect to={this.props.redirectTo} /> : null}
                <Logo></Logo>
                <WingBlank>
                    <List>
                        <InputItem
                            onChange={v=>{this.handleChange('user',v)}}>用户名</InputItem>
                        <InputItem
                            onChange={v=>{this.handleChange('pwd',v)}}>密码</InputItem>
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


export  default  Login