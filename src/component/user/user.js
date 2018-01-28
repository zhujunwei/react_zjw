import React from 'react';
import { connect } from 'react-redux';
import { Result, Icon, WhiteSpace,List,Button,WingBlank,Modal,Toast } from 'antd-mobile';
import browserCookie from 'browser-cookies';
import { logoutSubmit } from '../../redux/user.redux';
import { Redirect} from 'react-router-dom';

import axios from 'axios';

@connect(
    state=>state.user,
    {logoutSubmit}
)
export default class User extends React.Component{
    constructor(props){
        super(props);
        this.imgChoose = this.imgChoose.bind(this);
        this.changeImg = this.changeImg.bind(this);
    }

    logout(){
        const alert = Modal.alert;
        alert('注销', '确认退出登录么？', [
            { text: 'Cancel', onPress: () => console.log('cancel'), style: 'default' },
            { text: 'OK', onPress: () => {
                browserCookie.erase('userid');
                //清空redux数据
                this.props.logoutSubmit();
            }},
        ]);
        // browserCookie.erase('userid');
    }
    //弹出选择图片选项框
    imgChoose(){
        console.log(111);
        console.log(this.refs.myInput);
        this.refs.myInput.click();
    }
    //更换图片
    changeImg(event){
        console.log(this.refs.myInput.files[0]);
        
        const formData = new FormData();
        let filePath = this.refs.myInput.files[0];
        formData.append('file',filePath);
        axios.post('/upload/avatar',formData)
            .then(res=>{
                console.log(res)
            })
            .catch(err=>{
                console.log(err);
            })
    }


    render(){

        const props = this.props;
        console.log(props)
        const Item = List.Item;
        const Brief = Item.Brief;
        return props.user ? (
            <div>
                <input type="file" style={{visibility: 'hidden',height: 0,width: 0}}  accept="image/png, image/jpeg, image/jpg" ref="myInput" onChange={this.changeImg}></input>
                <Result
                    img={<img src={require(`../images/${props.avatar}.png`)} width="50px" alt=""  onClick={this.imgChoose} />}
                    title={props.user}
                    message={<div>{props.type == 'boss'?props.company:null}</div>}
                />
                <WhiteSpace />
                <List renderHeader={()=>'简介'}>
                    <Item multipleLine>
                        职位:{props.title}
                        简介:{this.props.desc.split('\n').map((v,index)=>(
                            <Brief key={index}>{v}</Brief>
                        ))}
                       {props.money ? <Brief >薪资:{props.money}</Brief>:null }
                    </Item>
                </List>
                <WhiteSpace />
                <WhiteSpace />
                <WhiteSpace />
                <WingBlank>
                    <Button type="primary"  onClick={this.logout.bind(this)}>退出登录</Button>
                </WingBlank>

                {/*<List >*/}
                    {/*<Item onClick={this.logout.bind(this)}>*/}
                        {/*{'退出登录'}*/}
                    {/*</Item>*/}
                {/*</List>*/}
            </div>
        ): <Redirect to={this.props.redirectTo ?this.props.redirectTo : 'me' }/>
    }
}