import express from 'express';
import config from './config';
import nunjucks from 'nunjucks';
import bodyParser from './../middle_wares/body_parser'
import errorLog from './../middle_wares/error_log'


// 3. 引入路由
import indexRouter from './../routes/index';
import sowingRouter from './../routes/sowing';
import userRouter from './../routes/user';


const  app = express();


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