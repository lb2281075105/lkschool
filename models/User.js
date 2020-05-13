import mongoose from 'mongoose'

// 创建轮播图的模式对象
const userSchema = mongoose.Schema({
    // 姓名
    real_name: {type: String, default:'撩课大管家'},
    // 用户名
    user_name: {type: String, required: true},
    // 密码
    user_pwd: {type: String, required: true},
    // 头像
    icon_url: {type: String, required: true},
    // 手机号码
    phone: {type: String, required: false},
    // 邮箱
    e_mail: {type: String, required: false},
    // 加入日期
    join_time: {type: String, required: false},
    // 自我介绍
    intro_self: {type: String, default:'撩课大管家'},
    // 积分
    points: {type: Number, default: 100},
    // 等级
    rank: {type: Number, default: 1},
    // 金币
    gold: {type: Number, default: 0},
    // 当前编辑的时间
    l_edit: {type: String, default: Date.now()},
    // 添加时间
    c_time: {type: String, default: Date.now()}
});

const User = mongoose.model('User', userSchema);
export default User;


