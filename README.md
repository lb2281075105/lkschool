# lkschool
Node服务端   Web端  后台管理系统


#####项目根目录中node_modules文件夹删除掉了,需要运行项目,请在项目根目录中执行npm install安装package.json文件中所需要的依赖

1.express 运用于Node.js的后端框架,经常使用的后端框架还有Koa egg.js<br><br>
2.babel-register 可以作为三方插件,把es6的语法转化成es5<br><br>
3.babel高阶语法转化:全局安装 npm install -g babel-cli,项目中安装 npm install babel-cli --save-dev<br><br>
3."dev": "node main.js", // 开发环境运行 npm run dev<br><br>
  "build": "babel src -d dist", // 打包成es5 npm run build<br><br>
  "start": "node dist/app.js" // 线上部署运行 npm run start<br><br>
5.配置静态文件访问路径config<br><br>
6.配置模板引擎 npm install nunjucks --save<br><br>
