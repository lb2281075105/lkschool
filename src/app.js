import express from 'express';
import config from './config';

const  app = express();


// 1.配置公共资源访问路径 config.publicPath 全路径
app.use(express.static(config.publicPath));

app.get('/', (req, res)=>{

    res.end('hello, itLike liubo 666');
});

app.listen(3000, ()=>{
    console.log('server is running');
});