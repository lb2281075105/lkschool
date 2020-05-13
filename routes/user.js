import express from 'express';
import md5 from 'blueimp-md5';
import User from './../models/User';


const S_KEY = 'ItLike.Com';

const router = express.Router({});



/**************************接口API-start*****************************/

/**
 * 生成后台管理员
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