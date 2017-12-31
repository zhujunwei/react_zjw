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
import BossInfo from './container/bossinfo/bossinfo';
import geniusInfo from './container/geniusinfo/geniusinfo';
import Dashboard from './component/dashboard/dashboard';

const reduxDevTools = window.devToolsExtension ?  window.devToolsExtension() :()=>{};
//新建store
const store = createStore(reducers,compose(
    applyMiddleware(thunk),
    reduxDevTools
));

ReactDOM.render(
    (<Provider  store={store}>
        <BrowserRouter>
            <div>
                <AuthRoute></AuthRoute>
                <Switch>
                    <Route path="/bossinfo" component={BossInfo}></Route>
                    <Route path="/geniusinfo" component={geniusInfo}></Route>
                    <Route path="/login" component={Login}/>
                    <Route path="/register" component={Register}/>
                    <Route component={Dashboard}/>
                </Switch>

            </div>
        </BrowserRouter>
    </Provider>), document.getElementById('root'));


