# FE-automation
#####研究包括：自动化构建、任务运行器、模块打包工具、CSS 预处理器、JavaScript 编译器、代码检查工具、测试框架、持续集成和部署、包管理器等研究如何利用他们做一些sao操作提高前端工作效率的技术。
####欢迎各位共同完善或提出需求思路，把一些的事让程序做，把时间放在更深入更广的技术专研以及工作中业务理解上。
##演示地址:
###https://demo.chenzeou.com.cn/ 
## 目前完成功能
### 一.自动生成路由和菜单
####核心代码在src/router/index.ts和src/utils/Router
####通过配置组件下的config.ts.routeConfig文件生成路由
####解决每次新建页面都得去手动加一下路由，减少项目高峰期的代码冲突和思路被打断
### 二.自动引入store
####核心代码在src/utils/Store.ts
####自动引入@/store目录下的ts文件和@/view组件路径下的store.ts文件
####解决每次新建store都要去引入，减少项目高峰期的代码冲突

### 三.自动获取后端字典数据
####核心代码在src/dict下文件和src/store/dict.ts
####路由切换时可自动获取当前页面需要用到的哪些字典
####解决在功能开发的时候，一个页面可能需要引入许多下拉数据字典，这时经常需要手动在代码里去定义字典数据，请求接口这种繁琐的事，还可以做到上个页面已经请求到的字典，当前页面用到就不需要请求

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

