# res-front

山东大学软件学院本科毕业设计-管理员前端

## 使用

```
# for develop
npm i
npm start
npm run dev

# for test
npm run build
npm run dev
```

## 目录结构

```
src
|-components								# 自定义业务组件
|	|-xxx
|		|-index.tsx							# 基本组件布局
|		|-hooks.ts							# 组件业务逻辑
|		|-xxx.module.less					# 组件样式
|
|-page										# 页面容器
|	|-route.tsx
|	|-xxx
|		|-index.tsx							# 基本组件布局
|		|-hooks.ts							# 组件业务逻辑
|		|-xxx.module.less					# 组件样式
|
|-store										# redux状态管理
|	|-index.ts								# 注册、合并dispatch，创建store
|	|-xxx
|		|-action.ts							# action, payload定义
|		|-dispatch.ts						# dispatch定义
|		|-hooks.ts							# 抽象业务组件调用方法
|
|-request									# 异步http请求，ws通信
|
|-utils										# 通用工具库
|
|-constant									# 配置、实体类型等常量定义
```

## 组件层级

```
page: 模块整体数据操作
component:
	container: 与具体业务相关数据进行交互
	ui: 与store完全解藕

# 使用function component搭配useMemo, useCallback减少实例
```