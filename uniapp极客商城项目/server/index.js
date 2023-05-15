//引入express包
const express = require('express')
//引入文件模块
const fs = require('fs')
require('body-parser')
const router = require('./router.js')

//创建服务器应用程序
//也就是原来的http.createServer()
const app = express();
/* 使用模板引擎 */
app.engine('html', require('express-art-template'));
/* 
解决跨域问题
all()
  所有路径请求都会进入all方法的回调
 */
app.all('*', function(req, res, next) {
  //指定允许其他域名访问 *表示允许其他所有域名访问
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers','*');
  next()
})

//公开指定目录
//只要这样做了 你就可以直接通过 /public/xxx的方式访问public目录中的所有资源了
app.use('/public/',express.static('./public/'));

//配置body-parser
//只要加入这个配置 req对象上就会多出来一个属性:body
//我们可以通过 req.body 来获取post请求客户端传过来的数据
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//挂载路由
app.use(router)

//下面代码相当于server.listen
app.listen(3000,'0.0.0.0',()=>{
    console.log('服务器运行中...');
    //在浏览器输入127.0.0.1:3000就可以访问了
})

