import React from 'react';
import propTypes from 'prop-types';
import './chat-msg-list.css';

export default class ChatMsgList extends React.Component{
    static propTypes = {
        isMySend: propTypes.bool.isRequired
    }

    constructor(props){
        super(props);
    }
    render(){
        return(
            <div>
                {this.props.isMySend ? (
                    <div className="chat-msg-list">
                        <div className='chat-msg-block self-bac'>{this.props.content}</div>
                        <div className='chat-msg-img marginLeft10'>
                            <img src={this.props.avatar} width="100%" height="100%"/>
                        </div>
                    </div>
                ):(
                    <div className="chat-msg-list2">
                        <div className='chat-msg-img2 marginRight10 '>
                            <img  src={this.props.avatar} width="100%" height="100%"/>
                        </div>
                        <div className='chat-msg-block other-bac'>{this.props.content}</div>

                    </div>
                )}
            </div>
        )
    }
}