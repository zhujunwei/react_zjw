import React from 'react';
import Logo from '../../component/logo/logo'
import { List, InputItem, WhiteSpace ,WingBlank, Button} from 'antd-mobile';

class Login extends React.Component{

    constructor(){
        super();
    }

    register(){
        console.log(this.props);
        this.props.history.push('/register')
    }

    render(){
        return (
            <div>
                <Logo></Logo>
                <WingBlank>
                    <List>
                        <InputItem>用户名</InputItem>
                        <InputItem>密码</InputItem>
                    </List>
                    <WhiteSpace></WhiteSpace>
                    <Button type='primary'>登录</Button>
                    <WhiteSpace></WhiteSpace>
                    <Button type='primary' onClick={this.register.bind(this)}>注册</Button>
                </WingBlank>
            </div>
        )
    }
}

export  default  Login