import React from 'react';
import { NavBar ,InputItem,TextareaItem,WhiteSpace ,Button,WingBlank} from 'antd-mobile';
import AvatarSelector from '../../component/avatar-selector/avatar-selector'
import {connect } from 'react-redux';
import { update } from '../../redux/user.redux'
import {Redirect} from 'react-router-dom';
@connect(
    state=>state.user,
    {update}
)
export  default class bossInfo extends React.Component{
    constructor(){
        super();
        this.state = {
            title:'',
            avatar:"",
            company:'',
            desc:''
        }
    }

    onChange(key,v){
        this.setState({
            [key]:v
        })
    }

    selectAvatar(val){
        this.setState({
            avatar:val
        })
    }

    render(){
        const path = this.props.location.pathname;
        const redirect = this.props.redirectTo;
        return (
            <div>
                {redirect && (redirect !== path)? <Redirect to={this.props.redirectTo}></Redirect> : null}
                <NavBar mode="dark">BOSS完善信息页面</NavBar>
                <AvatarSelector selectAvatar={this.selectAvatar.bind(this)}></AvatarSelector>
                <WhiteSpace/>
                <InputItem onChange={v=>this.onChange('title',v)}>
                    招聘职位
                </InputItem>
                <InputItem onChange={v=>this.onChange('company',v)}>
                    公司名称
                </InputItem>
                <InputItem onChange={v=>this.onChange('money',v)}>
                    职位薪资
                </InputItem>
                <TextareaItem
                    title={'职位要求'}
                    rows={3}
                    autoHeight
                    onChange={v=>this.onChange('desc',v)}>
                </TextareaItem>
                <WhiteSpace/>
                <WhiteSpace/>
                <WingBlank size="sm">
                    <Button
                        onClick={()=>{
                            this.props.update(this.state)
                        }}
                        type='primary'>保存</Button>
                </WingBlank>

            </div>
        )
    }
}