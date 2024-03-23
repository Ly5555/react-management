<!--
 * @Author: Lyq
 * @Date: 2023-09-06 19:51:49
 * @LastEditors: Lyq 
 * @LastEditTime: 2024-03-22 21:42:15
-->
# Hooks 🚀

### 一、介绍 📖

🚀🚀🚀  React18、React-Router v6、React-Hooks

### 二、安装使用步骤 📑

- **Run：**

```text
npm i
npm run dev:dev
```
### 三、文件资源目录 📚

```text
Hooks
├─ .vscode                # vscode推荐配置
├─ public                 # 静态资源文件（忽略打包）
├─ src
│  ├─ assets              # 静态资源文件
│  ├─ components          # 业务通用组件
│  ├─ layouts             # 通用布局
│  ├─ routers             # 路由管理
│  ├─ store               # zustand
│  ├─ styles              # 全局样式
│  ├─ typings             # 全局 ts 声明
│  ├─ utils               # 工具库
│  ├─ pages               # 业务页面入口和常用模板
│  ├─ App.tsx             # 入口页面
│  ├─ index.tsx           # 入口文件
├─ index.html             # 入口 html
├─ lint-staged.config     # lint-staged 配置文件
├─ package-lock.json      # 依赖包包版本锁
├─ package.json           # 依赖包管理
├─ README.md              # README 介绍
├─ tsconfig.json          # typescript 全局配置
```
### 四、部分使用 📑

- **打开新页面使用**

```
pathname: "路径",
search:"查询参数"
tile:"标题" 不配置这个默认路由名称
```
```text

navigate({
  pathname: "/details",
  search: `?${createSearchParams({ id: record.id, title: `角色管理` })}`,
});
```

