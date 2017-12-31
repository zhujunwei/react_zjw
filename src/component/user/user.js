import React from 'react';
import { connect } from 'react-redux';
import { Result, Icon, WhiteSpace,List,Button,WingBlank,Modal,Toast } from 'antd-mobile';
import browserCookie from 'browser-cookies';
import { logoutSubmit } from '../../redux/user.redux';
import { Redirect} from 'react-router-dom';

@connect(
    state=>state.user,
    {logoutSubmit}
)
export default class User extends React.Component{
    constructor(){
        super();
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

    render(){

        const props = this.props;
        console.log(props)
        const Item = List.Item;
        const Brief = Item.Brief;
        return props.user ? (
            <div>

                <Result
                    img={<img src={require(`../images/${props.avatar}.png`)} width="50px" alt="" />}
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
        ): <Redirect to={this.props.redirectTo}/>
    }
}