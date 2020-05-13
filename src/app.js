import express from 'express';
import config from './config';
import nunjucks from 'nunjucks';
import bodyParser from './../middle_wares/body_parser'
import login_pass from './../middle_wares/login_pass'
import errorLog from './../middle_wares/error_log'


// 3. 引入路由
import indexRouter from './../routes/index';
import sowingRouter from './../routes/sowing';
import userRouter from './../routes/user';

// 引入express-session
import session from 'express-session'
// 引入connect-mongo用于express连接数据库存储session
const mongoStore  = require('connect-mongo')(session);


const  app = express();


// 6. 使用session
app.use(session({
    secret:'itlike',//加密字符串
    name:'like_id',//返回客户端key的名称，默认为connect_sid
    resave:false,//强制保存session，即使它没有变化
    saveUninitialized:true,//强制将未初始化的session存储。当新建一个session且未设定属性或值时，它就处于未初始化状态。在设定cookie前，这对于登录验证，减轻服务器存储压力，权限控制是有帮助的，默认为true
    cookie:{maxAge:1800000 },
    rolling:true, //在每次请求时进行设置cookie，将重置cookie过期时间
    store:new mongoStore({//将session数据存储到mongo数据库中
        url:'mongodb://127.0.0.1/college', //数据库地址
        touchAfter:24*3600  //多长时间往数据库中更新存储一次，除了在会话数据上更改了某些数据除外
    })
}));


// 1.配置公共资源访问路径 config.publicPath 全路径
app.use(express.static(config.publicPath));

// 2. 配置中间件（nunjucks模板引擎能够作用到views文件夹中的模板）
nunjucks.configure(config.viewsPath, {
    autoescape: true,
    express: app,
    noCache: true // 不使用缓存，模板每次都会重新编译
});

// 配置数据处理的中间件(在所有的get post 之前配置)
app.use(bodyParser);
// 配置后端的拦截请求
app.use(login_pass);
// 4.挂载路由
app.use(indexRouter);
app.use(sowingRouter);
app.use(userRouter);

// app.get('/', (req, res)=>{
//
//     res.end('hello, itLike liubo 666');
// });

// 5. 挂载错误中间件(404前后都可以)
// 错误的和404 一定放在最后面
app.use(errorLog);

// 挂载路由最后面
app.use((req,res)=>{
    res.render('404.html');
});

app.listen(3000, ()=>{
    console.log('server is running');
});