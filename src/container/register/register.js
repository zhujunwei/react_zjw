import React from 'react';
import Logo from '../../component/logo/logo';
import { List, InputItem, WhiteSpace ,WingBlank, Button,Radio, Flex} from 'antd-mobile';
import {connect} from 'react-redux';
import {register } from '../../redux/user.redux';
import '../../index.css';
import {
    Route,
    Link,
    Redirect
} from 'react-router-dom';

@connect(
    state => state.user,
    {register }
)
class Register extends React.Component{
    constructor(){
        super();
        this.state ={
            type:'genuis',
            user:'',
            pwd:'',
            repeatpwd:''
        }
    }

    handleChange(key,value){
        this.setState({
            [key]:value
        })
    }

    handlerRegister(){
        console.log(this.state);

        this.props.register(this.state);
    }

    render(){
        const RadioItem = Radio.RadioItem;
        return (
            <div>
                {this.props.redirectTo ? <Redirect to={this.props.redirectTo} /> : null}
                <Logo></Logo>
                <WingBlank>
                    <List>
                        <InputItem onChange={v=> this.handleChange('user',v)}>用户名</InputItem>
                        {this.props.msg?<p className='error-msg'>{this.props.msg}</p>:null}
                        <InputItem type="password" onChange={v=> this.handleChange('pwd',v)}>密码</InputItem>
                        <InputItem type="password" onChange={v=> this.handleChange('repeatpwd',v)}>确认密码</InputItem>
                        <RadioItem checked={this.state.type === 'genuis'} onChange={() => this.handleChange('type','genuis')}>
                            牛人
                        </RadioItem>
                        <RadioItem checked={this.state.type === 'boss'}  onChange={() => this.handleChange('type','boss')}>
                            老板
                        </RadioItem>
                    </List>
                    <WhiteSpace></WhiteSpace>
                    <WhiteSpace></WhiteSpace>
                    <Button type='primary' onClick={this.handlerRegister.bind(this)} >注册</Button>
                </WingBlank>
            </div>

        )
    }
}

export  default  Register