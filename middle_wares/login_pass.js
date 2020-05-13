export default (req,res,next)=>{

    // 1.过掉所有非后端请求

    if (req.path.indexOf('/back/') == -1){

        return next();
    }


    // 2.判断所有的后端请求是否处于已经登录状态

    if(req.session.token){
        return next();
    }

    // 3.没有登录
    // 3.1 接口

    if (req.path.indexOf('/api/') !== -1){
        return new Error('没有足够的访问权限');
    }

    // 3.2 页面
    res.render('back/login.html');
};