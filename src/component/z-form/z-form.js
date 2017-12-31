import React from 'react';
//属性代理的高阶组件
export default function ZForm(Comp){
    return class WrapperComp extends React.Component{
        constructor(props){
            super(props);
            this.state = {};
            this.handleChange = this.handleChange.bind(this);
        }
        handleChange(key,value){
            this.setState({
                [key]:value
            })
        }

        render(){
            return <Comp {...this.props}  handleChange={this.handleChange} state={this.state}></Comp>
        }
    }
}