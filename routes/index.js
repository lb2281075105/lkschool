
// CommonJS规范
// const express = require('express');
import express from 'express';
import Sowing from './../models/Sowing'

const router = express.Router({});


/*******************后端页面路由***********************/

router.get('/back',(req,res)=>{

    // render 默认会进如到views文件夹下
    res.render('back/index.html');
});



/*******************前端页面路由***********************/

router.get('/',(req,res)=>{
    res.redirect('/web');
});
// 会重定向到这个路由
router.get('/web',(req,res)=>{
    res.render('web/index.html');
});

router.get('/web/res',(req,res)=>{

    Sowing.find({},"_id image_title image_url image_link s_time e_time",(err,sowings)=>{

        if (err){
            return next(err);
        }

        let tags = ['one','two','three','four'];

        for(let i = 0;i < sowings.length;i++){
            let sowing = sowings[i];
            sowing.images_tag = tags[i];
        }

        // res.json({
        //     result:sowingArray
        // })
        res.render('web/resources.html',{sowings});

    });

});


router.get('/web/res_c',(req,res)=>{
    res.render('web/resources_content.html');
});











// CommonJS规范
// module.exports = router;

export default router;

// 两回事
// export default {
//     router
// }