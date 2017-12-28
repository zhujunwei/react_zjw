import React from 'react';
import { Grid ,List} from 'antd-mobile';
import propTypes from 'prop-types';//类型约束


export  default class AvatarSelector extends React.Component{
    //设置类型约束
    static  propTypes = {
        selectAvatar : propTypes.func.isRequired
    }
    constructor(){
        super();
        this.state={

        }
    }

    render(){
        const avatarList = 'woman,man,boy,girl,bull,chick,crab,hedgehog,hippopotamus,koala,pig,tiger,whale,zebra'.split(',')
            .map((val,text)=>({
                icon:require(`../images/${val}.png`),
                text:val
            }));
        const gridHeader
                = this.state.text ?
                    (<div>
                        <span>
                            已选择头像
                            <img style={{width:20}} src={this.state.icon} />
                        </span></div>) : '请选择头像';
        return (
            <div>

                <List renderHeader={()=>gridHeader}>
                    <Grid data={avatarList} columnNum={5}
                    onClick={
                        elm=>{
                            this.setState(elm);
                            this.props.selectAvatar(elm.text);
                        }
                    }/>
                </List>

            </div>
        )
    }
}