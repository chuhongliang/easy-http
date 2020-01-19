# Eop
> Eop是一个基于koa的简单易用的开源web框架

#### 目录结构

``` javascript
eop-project
├── package.json
├── app.js                   
|   ├── controller
|   ├── public                         
|   ├── router                         
|   ├── service
|   ├── util
├── config 
    ├── config.default.js                  
```
如上,由框架约定的目录
- app/controller/** 用于解析用户的输入，处理后返回相应的结果
- app/service/** 用于编写业务逻辑层
- app/public/** 用于放置静态资源
- config/config.{env}.js 用于编写配置文件
- app.js 启动时的初始化工作