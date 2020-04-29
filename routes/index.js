
// CommonJS规范
// const express = require('express');
import express from 'express';
const router = express.Router();

router.get('/back',(req,res)=>{

    // render 默认会进如到views文件夹下
    res.render('back/index.html');
});


// CommonJS规范
// module.exports = router;

export default router;

// 两回事
// export default {
//     router
// }