import express from 'express';
import md5 from 'blueimp-md5';
import formidable from 'formidable';
import {basename} from 'path'

import config from './../src/config';
import User from './../models/User';


const S_KEY = 'ItLike.Com';

const router = express.Router({});



/**************************接口API-start*****************************/

/**
 * 生成后台管理员:用postMan请求
 */

router.post('/user/api/add', (req, res, next) => {
    let user_name = req.body.user_name || '';
    let user_pwd = md5(req.body.user_pwd + S_KEY) || '';

    let user = new User({
        user_name: user_name,
        user_pwd: user_pwd
    });

    user.save((err, result) => {
        if (err) {
            return next(err);
        }
        res.json({
            status: 200,
            result: '添加管理员成功'
        })
    });

});

/**
 * 用户名和密码进行登录
 */

router.post('/user/api/login',(req,res,next)=>{

    let user_name = req.body.user_name;
    let user_pwd = req.body.user_pwd;

    User.findOne({user_name:user_name},(err,user)=>{

        if (err){
            return next(err);
        }


        if (user !== null){

            if (user.user_pwd == user_pwd){

                // 在session中存储客户端的信息
                req.session.token = user._id;
                res.json({
                    status:200,
                    result:{
                        token:user._id,
                        meaasge:'登录成功'
                    }
                })
            }else {
                res.json({
                    status:1,
                    result:'输入密码错误'
                })
            }
        }else {
            res.json({
                status:1,
                result:'输入口令不存在'
            })
        }
    });
});

/**
 * 退出登录
 */

router.get('/back/user/api/logout',(req,res,next)=>{

    // 1.第一种方法
    req.session.cookie.maxAge = 0;
    // 2.第二种方法
    // req.session.destroy((err)=>{
    //
    //     return next(err);
    // });

    res.json({
        status:200,
        result:'退出登录成功!'
    });

});

/**
 * 获取用户信息 - 部分
 */

router.get('/back/user/api/u_msg/:token',(req,res,next)=>{

    const token = req.params.token;

    User.findById({_id:token},'-_id icon_url real_name intro_self points rank gold',(err,user)=>{

        if (err){
            return next(err);
        }

        if (user){
            res.json({
                status:200,
                result:user
            });
        }else {
            req.session.cookie.maxAge = 0;
        }

    });

});
/**
 * 获取用户信息 - 几乎所有
 */

router.get('/back/user/api/u_msg_all/:token',(req,res,next)=>{

    const token = req.params.token;

    User.findById({_id:token},'-_id -user_name -user_pwd -points -rank -gold -l_edit -c_time',(err,user)=>{

        if (err){
            return next(err);
        }

        if (user){
            res.json({
                status:200,
                result:user
            });
        }else {
            req.session.cookie.maxAge = 0;
        }

    });

});

/**
 * 根据id去修改用户信息
 */

router.post('/back/user/api/edit',(req,res,next)=>{

    const form = new formidable.IncomingForm();
    form.uploadDir = config.uploadsPath;
    form.keepExtensions = true; // 保留文件的原始扩展名

    form.parse(req,(err,fields,files)=>{

        if (err){
            return next(err);
        }

        let body = fields;
        // body.image_url = basename(files.image_url.path);
        // 1.修改用户信息
        User.findById(body.id,(err,user)=>{
            if (err){
                return next(err);
            }

            // 2. 修改用户数据
            user.real_name = body.real_name;
            user.phone = body.phone;
            user.icon_url = body.icon_url || basename(files.icon_url.path);
            user.e_mail = body.e_mail;
            user.join_time = body.join_time;
            user.intro_self = body.intro_self;


            // 3.保存

            /**
             * _id 是一样的
             * 不会新增一条记录
             * 而是去更新已有的数据
             */

            user.save((err,result)=>{
                if (err){
                    return next(err);
                }
                // sowing
                res.json({
                    status:200,
                    result:'用户信息修改成功'
                })
            });
        });
    });

});

/**
 * 根据token去修改密码
 */

router.post('/back/user/api/reset/',(req,res,next)=>{

    const token = req.body.token;
    const old_pwd = req.body.old_pwd;
    const new_pwd = req.body.new_pwd;

    User.findById(token,(err,user)=>{

        if (err){
            return next(err);
        }

        if (user.user_pwd === old_pwd){

            user.user_pwd = new_pwd;
            user.save((err, result) => {
                if (err) {
                    return next(err);
                }
                res.json({
                    status: 200,
                    result: '修改密码成功'
                })
            });

        }else {
            res.json({
                status:1,
                result:'输入的原始密码错误'
            })
        }

    });
});


/**************************接口API-end*****************************/




/**************************页面路由-start*****************************/

router.get('/back/login',(req,res,next)=>{
    res.render('back/login.html');
});


router.get('/back/u_center',(req,res,next)=>{
    res.render('back/user_center.html');
});

router.get('/back/u_set',(req,res,next)=>{
    res.render('back/user_message.html');
});

router.get('/back/u_reset_pwd',(req,res,next)=>{
    res.render('back/reset_pwd.html');
});

/**************************页面路由-end*****************************/


export default router;