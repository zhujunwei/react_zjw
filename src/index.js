import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import thunk from 'redux-thunk';
//applyMiddleware 处理中间件
import {createStore,applyMiddleware,compose} from 'redux';

import {Provider} from 'react-redux';
import {
    BrowserRouter,
    Route,
    Link,
    Redirect,
    Switch
} from 'react-router-dom';

import reducers from './reducers'
import './config';

import Login from './container/login/login';
import Register from './container/register/register';
import AuthRoute from './component/authroute/authroute';


const reduxDevTools = window.devToolsExtension ?  window.devToolsExtension() :()=>{};
//新建store
const store = createStore(reducers,compose(
    applyMiddleware(thunk),
    reduxDevTools
));
function Boss(){
    return <h1>111</h1>
}

ReactDOM.render(
    (<Provider  store={store}>
        <BrowserRouter>
            <div>
                <AuthRoute></AuthRoute>
                <Route path="/boss" component={Boss}></Route>
                <Route path="/login" component={Login}/>
                <Route path="/register" component={Register}/>
            </div>
        </BrowserRouter>
    </Provider>), document.getElementById('root'));

