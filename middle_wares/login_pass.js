export default (req,res,next)=>{

    // 1.过掉所有非后端请求:接口和页面路由
    if (req.path.toLowerCase().indexOf('/back/') === -1){ // 没有找到含/back/后端请求(接口和页面路由)

        return next();
    }


    // 2.判断所有的后端请求是否处于已经登录状态

    if(req.session.token){
        return next();
    }

    // 3.没有登录
    // 3.1 接口

    if (req.path.toLowerCase().indexOf('/api/') !== -1){
        return next(new Error('没有足够的访问权限'));
    }

    // 3.2 页面
    res.render('back/login.html');
};