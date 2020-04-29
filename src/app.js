import express from 'express';
import config from './config';
import nunjucks from 'nunjucks';


// 3. 引入路由
import indexRouter from './../routes/index';


const  app = express();


// 1.配置公共资源访问路径 config.publicPath 全路径
app.use(express.static(config.publicPath));

// 2. 配置中间件（nunjucks模板引擎能够作用到views文件夹中的模板）
nunjucks.configure(config.viewsPath, {
    autoescape: true,
    express: app,
    noCache: true // 不使用缓存，模板每次都会重新编译
});


// 4.挂载路由
app.use(indexRouter);

// app.get('/', (req, res)=>{
//
//     res.end('hello, itLike liubo 666');
// });

app.listen(3000, ()=>{
    console.log('server is running');
});