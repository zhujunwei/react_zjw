## 技术栈 : react16 + redux + router4 + antd-mobile + axios + nodeJS + express + mongodb

## 运行项目(需要nodeJS 6.0+环境)

    1. git clone https://github.com/zhujunwei/react_redux.git
    2. 安装mongodb
    3. cd 项目根目录
    4. npm install
    5. 启动mongodb (查看mongodb启动端口默认27071;如果不是修改server文件下面的model.js)
    6. nodemon server/server.js (后台服务)
    7. 根目录运行 npm start
    9. 访问地址 http://localhost:3000/login

## 前端插件安装(package.json 已存在)
    1.axios  npm install --save axios

    2.装饰器插件(@) npm i babel-plugin-transform-decorators-legacy --save

    3.react-router4 npm install react-router-dom --save

    4.antd-mobile npm install antd-mobile --save

    5.prop-types(属性校验) npm i --save prop-types

    6.redux  npm i --save redux

    7.react-redux npm i --save react-redux

    8.thunk(redux action异步中间件)  npm i --save thunk

    9.socket.io-client  npm install socket.io-client --save

## 后端插件安装

    1.body-parser   npm install body-parser --save

    2.md5加密(utility) npm install utility --save

    3.mongoose(连接mongodb) npm install mongoose --save

    4.socket.io  npm install socket.io --save

##项目代理proxy

    在package.json中配置 "proxy": "http://localhost:9093"

## redux文件夹
    1.用户相关的reducer（包含登录，注册等功能）
    2.获取用户列表的reducer
    3.在线聊天，未读消息，聊天数据的reducer
    在reducers中使用  redux的combineReducers合并reducer；
    在index.js中使用 createStore创建store ，并使用applyMiddleware使用异步的action

## Eslint
    aribnb 定制风格

## 动画解决方案
    npm i --save rc-queue-anim

## 打包编译
    npm run build


## ssr 服务器端渲染
    1.安装 npm i --save babel-node （node 端支持es6）
    2.项目根目录配置.babelrc的配置文件
    3."server": "cross-env NODE_ENV=test nodemon --exec babel-node server/server.js",package.json中增加
        备注：windows中需要安装cross-env
