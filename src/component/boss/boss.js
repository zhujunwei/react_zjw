import React from 'react';
import axios from 'axios';
import {Card,WhiteSpace,WingBlank} from 'antd-mobile';
export default class Boss extends React.Component{
    constructor(){
        super();
        this.state = {
            data:[]
        }
    }
    componentDidMount(){
        console.log(111);
        axios.get('/user/list?type=genius')
            .then(res=>{
                console.log('res',res)
                if(res.data.code == 0){
                    this.setState({
                        data:res.data.data
                    })
                }
            })
    }
    render(){
        return (
            <WingBlank>
                {this.state.data.map(v=>(
                    
                ))}
            </WingBlank>
        )
    }
}