import React from 'react';
import {List,InputItem,NavBar,Icon,Grid} from 'antd-mobile';
import {connect} from 'react-redux';
import {getMsgList,sendMsg,recvMsg,readMsg} from '../../redux/chat.redux';
import {getChatId} from '../../util';
import ChatMsgList from '../chat-msg-list/chat-msg-list';
@connect(
    state=>state,
    {getMsgList,sendMsg,recvMsg,readMsg}
)
export default class Chat extends React.Component{
    constructor(){
        super();
        this.state={
            text:"",
            msg:[]
        }
    }
    componentDidMount(){
        if(!this.props.chat.chatmsg.length){
            this.props.getMsgList();
            this.props.recvMsg();
        }
    }

    componentWillUnmount(){
        const targetId = this.props.match.params.user;
        this.props.readMsg(targetId);
    }

    fixCarousel(){
        setTimeout(function(){
            window.dispatchEvent(new Event('resize'))
        },200)
    }

    //发送消息
    handlerSubmit(){
        const from = this.props.user._id;
        const to = this.props.match.params.user;
        const msg = this.state.text;
        if(msg == '') return;
        this.props.sendMsg({from,to,msg});
        this.setState({
            text:"",
            showEmoji :false
        })
    }

    render(){
        const emoji = '😁 😁 😁 😁 😁 😁 😁 😁 😁 😁 😁 😁 😁 😁 😁 😁 😁 😁 😁 😁 😁 😁 😁 😁 😁 😁 😁 😁 😁 😁 😁 😁 😁 😁 😁 😁 😁 😁 😁 😁 '
            .split(' ')
            .filter(v=>v)
            .map(v=>({text:v}));
        //当前聊天目标的id
        const userid = this.props.match.params.user;
        const Item = List.Item;
        const users = this.props.chat.users;
        if(!users[userid]){
            return null;
        }
        const chatid = getChatId(userid,this.props.user._id);
        const chatmsgs = this.props.chat.chatmsg.filter((v)=> v.chatid == chatid);
        return(
            <div id="chat-page">
                <NavBar mode="dark"
                        icon={<Icon type="left" />}
                        onLeftClick={() => this.props.history.goBack()}
                >
                    {users[userid].name}
                </NavBar>
                <div className="chat-list-container">
                    {chatmsgs.map((v,i)=>{
                        const avatar = require(`../images/${users[v.from].avatar}.png`);
                        let isMySend = v.from == userid ? true : false;
                        return <ChatMsgList isMySend={isMySend} content={v.content} avatar={avatar}/>
                        // return v.from == userid?(
                        //     <List key={i}>
                        //         <Item
                        //             thumb={avatar}
                        //         >{v.content}</Item>
                        //     </List>
                        //
                        // ):(
                        //     <List key={i}>
                        //         <Item
                        //             extra={<img src={avatar} />}
                        //             className="chat-me">{v.content}</Item>
                        //     </List>
                        // )
                    })}

                </div>
                <div className="stick-footer">
                    <List>
                        <InputItem placeholder="请输入"
                            value={this.state.text}
                            onChange={v => {
                                this.setState({text: v})
                            }}
                            extra={
                                <div>
                                   <span style={{marginRight: 10}}
                                         onClick={() =>{
                                             this.setState({
                                                 showEmoji:!this.state.showEmoji
                                             });
                                             this.fixCarousel();
                                         } }
                                   >😁</span>
                        <span onClick={() => this.handlerSubmit()}>发送</span></div>
                        }
                        />
                    </List>
                    {this.state.showEmoji?(
                        <Grid
                            data={emoji}
                            columnNum={9}
                            isCarousel={true}
                            onClick={el=>{
                                console.log(el);
                                this.setState({
                                    text:this.state.text+el.text
                                })
                            }}
                        ></Grid>
                    ):null}

                </div>
            </div>

        )
    }
}