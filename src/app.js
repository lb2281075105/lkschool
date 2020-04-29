import express from 'express';

const  app = express();

app.get('/', (req, res)=>{
    res.end('hello, itLike liubo 666');
});

app.listen(3000, ()=>{
    console.log('server is running');
});