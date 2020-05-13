import express from 'express'
import formidable from 'formidable'
import config from './../src/config'
import {basename} from 'path'
import Sowing from './../models/Sowing'
const router = express.Router({});

/**************************接口API********************************/
/*
  往数据库中插入一条新纪录
*/
router.post('/back/sowing/api/add', (req, res,next)=>{

    const form = new formidable.IncomingForm();
    form.uploadDir = config.uploadsPath;
    form.keepExtensions = true; // 保留文件的原始扩展名

    form.parse(req,(err,fields,files)=>{

        if (err){
            return next(err);
        }

        let body = fields;
        body.image_url = basename(files.image_url.path);
        // console.log(files);
        //
        // console.log('================');
        //
        // console.log(basename(files.image_url.path),body);

        // 操作数据库
        const sowing = new Sowing({
            // 图片名称
            image_title: body.image_title,
            // 图片地址
            image_url: body.image_url,
            // 跳转链接
            image_link: body.image_link,
            // 上架时间
            s_time: body.s_time,
            // 下架时间
            e_time: body.e_time,
        });

        sowing.save((err, result)=>{
            if(err){
                // throw err;
                return next(err);
            }
            res.json({
                status: 200,
                result: '添加轮播图成功'
            })
        });
    });



    /**
     * 2.添加文本内容
     */
    // // 1. 获取数据
    // const body = req.body;
    //
    // // 操作数据库
    // const sowing = new Sowing({
    //     // 图片名称
    //     image_title: body.image_title,
    //     // 图片地址
    //     image_url: body.image_url,
    //     // 跳转链接
    //     image_link: body.image_link,
    //     // 上架时间
    //     s_time: body.s_time,
    //     // 下架时间
    //     e_time: body.e_time,
    // });
    //
    // sowing.save((err, result)=>{
    //     if(err){
    //         // throw err;
    //         return next(err);
    //     }
    //     res.json({
    //         status: 200,
    //         result: '添加轮播图成功'
    //     })
    // });
});


/**
 * 根据id去修改一条轮播图
 */

router.post('/back/sowing/api/edit',(req,res,next)=>{

    const form = new formidable.IncomingForm();
    form.uploadDir = config.uploadsPath;
    form.keepExtensions = true; // 保留文件的原始扩展名

    form.parse(req,(err,fields,files)=>{

        if (err){
            return next(err);
        }

        let body = fields;
        // body.image_url = basename(files.image_url.path);
        // 1.找到要修改的轮播图
        Sowing.findById(body.id,(err,sowing)=>{
            if (err){
                return next(err);
            }

            // 2. 修改轮播图数据
            sowing.image_title = body.image_title;
            sowing.image_link = body.image_link;
            sowing.image_url = body.image_url || basename(files.image_url.path);
            sowing.s_time = body.s_time;
            sowing.e_time = body.e_time;
            sowing.l_time = Date.now();


            // 3.保存

            /**
             * _id 是一样的
             * 不会新增一条记录
             * 而是去更新已有的数据
             */

            sowing.save((err,result)=>{
                if (err){
                    return next(err);
                }
                // sowing
                res.json({
                    status:200,
                    result:'修改轮播图成功'
                })
            });
        });
    });




});
/**
 * 获取轮播图列表
 */

router.get('/back/sowing/api/list',(req,res,next)=>{

    Sowing.find({},"_id image_title image_url image_link s_time e_time",(err,docs)=>{

        if (err){
            return next(err);
        }
        res.json({
            status:200,
            result:docs
        })

    });
});

/**
 * 获取一条轮播图(id)
 * /sowing/api/list/:sowingId 模糊路径匹配(只能模糊匹配一个)
 * /sowing/api/list/111
 * 千万不要
 * /sowing/api/list/111/2222/333
 */


router.get('/back/sowing/api/singer/:sowingId',(req,res,next)=>{

    Sowing.findById(req.params.sowingId,"_id image_title image_url image_link s_time e_time",(err,docs)=>{

        if (err){
            return next(err);
        }
        res.json({
            status:200,
            result:docs
        })

    });

});

/**
 * 删除一条轮播图(id)
 * /sowing/api/list/:sowingId 模糊路径匹配(只能模糊匹配一个)
 * /sowing/api/list/111
 * 千万不要
 * /sowing/api/list/111/2222/333
 */


router.get('/back/sowing/api/remove/:sowingId',(req,res,next)=>{

    Sowing.deleteOne({_id:req.params.sowingId},(err,result)=>{

        if (err){
            return next(err);
        }
        res.json({
            status:200,
            result:'成功删除轮播图'
        });

    });

});


/**************************页面路由********************************/

/**
 * 加载轮播图列表
 */

router.get('/back/s_list',(req,res,next)=>{
    Sowing.find({},"_id image_title image_url image_link s_time e_time",(err,sowings)=>{

        if (err){
            return next(err);
        }
        res.render('back/sowing_list.html',{sowings});
    });

});

/**
 * 添加轮播图
 */

router.get('/back/s_add',(req,res,next)=>{
    res.render('back/sowing_add.html');

});

/**
 * 添加轮播图
 */

router.get('/back/s_edit',(req,res,next)=>{
    res.render('back/sowing_edit.html');
});



export default router;