import React from 'react';
import {connect} from 'react-redux';

import { List,Badge} from 'antd-mobile'

@connect(
    state=>state
)
export  default  class Msg extends React.Component{

    getLast(arr){
        return arr[arr.length - 1];
    }
    render(){
        if(!this.props.chat.chatmsg.length){
            return null;
        }
        //按照用户分钟,根据chatid
        const msgGroup = {};
        this.props.chat.chatmsg.forEach(v=>{
            msgGroup[v.chatid] = msgGroup[v.chatid] || [];
            msgGroup[v.chatid].push(v);
        });
        const chatList = Object.values(msgGroup).sort((a,b)=>{
            const a_last = this.getLast(a).create_time;
            const b_last = this.getLast(b).create_time;
            return b_last - a_last;
        });
        const Item = List.Item;
        const Brief = Item.Brief;
        const userid = this.props.user._id;
        const userInfo = this.props.chat.users;
        return(
            <div>

                {chatList.map(v=>{
                    const lastMsg = this.getLast(v);
                    const targetId = v[0].from == userid ? v[0].to:v[0].from; //判断来源
                    const name = userInfo[targetId] ? userInfo[targetId].name:'';
                    const avatar = userInfo[targetId] ? userInfo[targetId].avatar:'man';
                    const unreadNum = v.filter(v=>!v.read && (v.to == userid)).length;
                    return (
                        <List key={lastMsg._id}>
                            <Item
                                extra={<Badge text={unreadNum}></Badge>}
                                thumb={require(`../images/${avatar}.png`)}
                                arrow="horizontal"
                                onClick={()=>{
                                    this.props.history.push(`/chat/${targetId}`)
                                }}
                            >
                                {lastMsg.content}
                                <Brief>{name}</Brief>
                            </Item>
                        </List>
                    )
                })}


            </div>
        )
    }
}