# 前中台解决方案 — 基于 Pexels 的图片分享社区

> 一个完整的 **Vue 3 + Vite + Tailwind CSS** 全栈前端中后台综合解决方案，涵盖 PC 端与移动端双端适配、瀑布流图片展示、用户认证体系、VIP 会员支付、主题切换、引导页等企业级功能模块。

**在线预览**：[https://imooc-front.lgdsunday.club/](https://imooc-front.lgdsunday.club/)

---

## 目录

- [项目概述](#项目概述)
- [技术栈](#技术栈)
- [快速开始](#快速开始)
- [项目架构](#项目架构)
  - [目录结构](#目录结构)
  - [路由设计](#路由设计)
  - [状态管理](#状态管理)
  - [组件体系](#组件体系)
- [核心功能模块](#核心功能模块)
  - [1. PC/移动端双端适配](#1-pc移动端双端适配)
  - [2. 瀑布流布局组件](#2-瀑布流布局组件)
  - [3. 路由动画系统](#3-路由动画系统)
  - [4. 主题切换系统](#4-主题切换系统)
  - [5. 用户认证体系](#5-用户认证体系)
  - [6. 图片详情与 GSAP 动画](#6-图片详情与-gsap-动画)
  - [7. 搜索系统](#7-搜索系统)
  - [8. VIP 会员与支付](#8-vip-会员与支付)
  - [9. 引导页系统](#9-引导页系统)
  - [10. 图片处理](#10-图片处理)
- [API 接口文档](#api-接口文档)
- [关键技术解析](#关键技术解析)
- [环境变量](#环境变量)
- [构建部署](#构建部署)

---

## 项目概述

本项目是一个基于 **Pexels 图片 API** 的图片分享社区，具备完整的前台用户交互体验。用户可以浏览瀑布流图片、搜索、查看大图详情、登录注册、购买 VIP 会员、编辑个人资料等。

### 核心页面

| 页面 | 路径 | 功能描述 |
|---|---|---|
| **首页** | `/` | 分类导航 + 瀑布流图片列表 + 无限滚动 + 悬停操作 |
| **图片详情** | `/pins/:id` | 大图预览 + GSAP 缩放动画 + 全屏/下载/分享 |
| **登录** | `/login` | 用户名密码 + 滑块验证码 + QQ/微信第三方登录 |
| **注册** | `/register` | 表单验证 + 第三方 OAuth 数据携带 |
| **VIP 会员** | `/member` | 套餐选择 + 倒计时 + 支付宝支付（PC/移动端双版） |
| **个人资料** | `/profile` | 头像裁剪上传（cropperjs + 阿里云 OSS）+ 信息编辑 |
| **支付结果** | `/pay/result` | 成功/失败状态展示 |
| **404** | `/404` | 未找到页面 |

---

## 技术栈

| 层面 | 技术方案 | 选型理由 |
|---|---|---|
| **核心框架** | Vue 3.2 + Composition API (`<script setup>`) | 新一代响应式框架，Composition API 提供更好的逻辑复用 |
| **构建工具** | Vite 2.x | 极快的冷启动和 HMR，基于 ESBuild 的预构建 |
| **路由** | Vue Router 4 | 支持 Composition API，哈希模式保证部署兼容性 |
| **状态管理** | Vuex 4 + vuex-persistedstate | 模块化管理，localStorage 持久化保证刷新不丢失 |
| **CSS 方案** | Tailwind CSS 3 + SCSS | 原子化 CSS 提高开发效率，SCSS 处理复杂样式 |
| **HTTP 客户端** | Axios + 拦截器 | 统一处理 token 注入、401 处理、错误提示 |
| **动画** | GSAP 3 | 高性能动画库，图片详情弹出/关闭动画 |
| **表单验证** | VeeValidate 4 | 声明式表单验证 |
| **图片处理** | cropperjs + file-saver + ali-oss | 头像裁剪、图片下载、OSS 直传 |
| **引导页** | driver.js | 分步引导用户了解功能 |
| **工具库** | @vueuse/core, dayjs, md5 | 组合式工具函数、日期处理、密码加密 |
| **图标方案** | vite-plugin-svg-icons (SVG Symbol) | 按需加载 SVG，支持颜色定制 |

---

## 快速开始

### 环境要求

- **Node.js** >= 16.x
- **npm** >= 7.x

### 安装与运行

```bash
# 1. 克隆项目
git clone https://github.com/Yran-nloy7/imooctext.git
cd imooctext

# 2. 安装依赖
npm install

# 3. 启动开发服务器
npm run dev

# 4. 构建生产版本
npm run build

# 5. 预览生产构建
npm run preview
```

### 环境配置

项目根目录需要创建 `.env.development` 文件：

```env
# 开发环境 — API 通过 Vite 代理转发
VITE_BASE_API=/api
```

Vite 开发服务器会自动将 `/api` 前缀的请求代理到 `https://api.imooc-front.lgdsunday.club/`。

---

## 项目架构

### 目录结构

```
imooc-front/
├── index.html                    # HTML 入口（QQ登录SDK、微博SDK、iconfont CDN）
├── vite.config.js                # Vite 配置：别名、代理、SVG图标插件
├── tailwind.config.js            # Tailwind 配置：暗模式、主题色、自定义高度
├── postcss.config.js             # PostCSS：tailwindcss + autoprefixer
├── public/
│   └── favicon.ico
└── src/
    ├── main.js                   # 应用入口：REM初始化 → 主题初始化 → 插件注册 → 挂载
    ├── App.vue                   # 根组件：m-transition-router-view 动画容器
    ├── permission.js             # 路由守卫：未登录拦截 → 跳转首页
    │
    ├── api/                      # 📡 API 接口层（Axios 实例 + 拦截器）
    │   ├── pexels.js             # 图片列表、搜索提示、主题推荐、单图详情
    │   ├── sys.js                # 登录、注册、验证码、用户资料、OSS STS
    │   ├── category.js           # 分类列表
    │   └── pay.js                # VIP 套餐列表、支付宝下单、支付结果查询
    │
    ├── components/               # 🧩 全局业务组件
    │
    ├── constants/
    │   └── index.js              # 常量：断点、默认分类、主题类型、登录类型、OSS配置
    │
    ├── directives/
    │   └── modules/lazy.js       # v-lazy 图片懒加载指令（IntersectionObserver）
    │
    ├── libs/                     # 📦 UI 组件库（m-* 前缀全局注册）
    │   ├── index.js              # 自动扫描注册：glob 匹配 → defineAsyncComponent
    │   ├── button/               # m-button：primary/main/info 风格 + loading
    │   ├── confirm/              # m-confirm：函数式调用，h() + render() 动态挂载
    │   ├── count-down/           # m-count-down：基于 dayjs duration 的倒计时
    │   ├── dialog/               # m-dialog：v-model 蒙版弹窗
    │   ├── infinite-list/        # m-infinite-list：IntersectionObserver 无限滚动
    │   ├── input/                # m-input：文本框/文本域 + 字符计数
    │   ├── message/              # m-message：函数式顶部通知（success/warn/error）
    │   ├── navbar/               # m-navbar：移动端顶栏（左/中/右插槽）
    │   ├── popover/              # m-popover：hover 弹出气泡（4种位置）
    │   ├── popup/                # m-popup：底部弹出面板 + 蒙版 + 滚动锁定
    │   ├── search/               # m-search：搜索框 + 下拉插槽 + 防抖
    │   ├── svg-icon/             # m-svg-icon：SVG Symbol 图标渲染
    │   ├── transition-router-view/ # m-transition-router-view：push/back 路由动画 + keep-alive
    │   ├── trigger-menu/         # m-trigger-menu：底部浮动菜单容器
    │   ├── trigger-menu-item/    # m-trigger-menu-item：菜单项（icon + text）
    │   └── waterfall/            # m-waterfall：瀑布流（最小高度列算法）
    │
    ├── router/
    │   ├── index.js              # 路由创建：根据 isMobileTerminal 动态选择路由表
    │   └── modules/
    │       ├── pc-routes.js      # PC 端路由：layout 嵌套结构
    │       └── mobile-routes.js  # 移动端路由：扁平结构
    │
    ├── store/
    │   ├── index.js              # Vuex 创建：5模块 + vuex-persistedstate
    │   ├── getters.js            # 全局 getters：分类、主题、搜索、用户、路由类型
    │   └── modules/
    │       ├── app.js            # 当前分类、搜索文本、路由跳转类型（push/back/none）
    │       ├── category.js       # 分类列表 + useCategoryData action
    │       ├── search.js         # 搜索历史（去重、倒序、单删、清空）
    │       ├── theme.js          # 主题类型（light/dark/system）
    │       └── user.js           # token、userInfo、登录/注册/登出 actions
    │
    ├── styles/
    │   └── index.scss            # @tailwind 指令 + 滚动条样式 + driver.js 修复
    │
    ├── utils/
    │   ├── flexible.js           # useREM() rem适配 + isMobileTerminal UA检测
    │   ├── theme.js              # 主题切换（light/dark/system + matchMedia 监听）
    │   ├── request.js            # Axios 实例：baseURL、icode头、token注入、401处理
    │   ├── color.js              # randomRGB() 随机颜色生成
    │   ├── sts.js                # 阿里云 OSS STS 临时凭证客户端
    │   ├── pay.js                # 支付宝支付跳转
    │   └── share.js              # 微博分享弹窗
    │
    ├── vendor/
    │   └── SliderCaptcha/        # 滑块验证码第三方库
    │
    └── views/                    # 📄 页面视图
        ├── layout/               # PC 端布局骨架
        │   ├── index.vue         # header(72px) + main + floating
        │   └── components/
        │       ├── header/       # 顶栏：logo + 搜索 + 主题切换 + 用户菜单
        │       ├── main.vue      # router-view 出口
        │       └── floating/     # 右下角浮动：引导页 + 反馈
        ├── main/                 # 首页 — 图片瀑布流
        │   ├── index.vue         # 导航 + 列表 + 移动端菜单
        │   └── components/
        │       ├── navigation/   # PC/移动端分类导航（双版本）
        │       ├── list/         # 无限滚动 + 瀑布流 + 详情弹出（GSAP动画）
        │       └── menu/         # 移动端分类菜单面板
        ├── pins/                 # 图片大图详情
        ├── login-register/       # 登录 & 注册（含滑块验证码、QQ/微信登录）
        ├── member/               # VIP 会员套餐（含支付宝支付）
        ├── profile/              # 个人资料（头像裁剪 + OSS 上传）
        ├── pay/                  # 支付结果
        └── error/404/            # 404 页面
```

### 路由设计

项目采用 **双路由表** 策略，根据设备类型动态选择：

```
┌─────────────────────────────────────────────────┐
│                  router/index.js                 │
│   isMobileTerminal ? mobileRoutes : pcRoutes    │
└──────────────┬──────────────────┬───────────────┘
               │                  │
       ┌───────▼──────┐   ┌──────▼──────────┐
       │ PC 端路由     │   │ 移动端路由       │
       │ (嵌套结构)    │   │ (扁平结构)       │
       ├───────────────┤   ├─────────────────┤
       │ / → layout/   │   │ / → main/       │
       │   / → main/   │   │ /pins/:id       │
       │   /pins/:id   │   │ /profile        │
       │   /profile    │   │ /member         │
       │   /member     │   │ /login          │
       │   /pay/result │   │ /register       │
       │ /login        │   │ /404            │
       │ /register     │   │                 │
       │ /404          │   │                 │
       └───────────────┘   └─────────────────┘
```

**关键设计**：
- **PC 端**使用 `/layout` 作为父路由，提供统一的 header + main 骨架
- **移动端**使用扁平路由，每个页面独立渲染（无需公共 header）
- 路由守卫 `permission.js` 拦截 `meta.user: true` 的页面，未登录自动跳转首页

### 状态管理

```
Vuex Store
├── app/         当前分类 | 搜索文本 | 路由跳转类型
├── category/    分类列表（API获取 + 默认数据降级）
├── search/      搜索历史（去重排列、增减、清空）
├── theme/       主题类型（light | dark | system）
└── user/        token | userInfo | 登录/注册/登出

持久化 (vuex-persistedstate → localStorage key: "imooc-front")
  保存模块：category、theme、search、user
  不持久化：app（每次刷新重置）
```

### 组件体系

15 个 `m-*` 前缀 UI 组件通过 `libs/index.js` 自动全局注册：

```js
// 自动扫描机制
const components = import.meta.glob('./*/index.vue')
// → 异步注册为 m-button, m-dialog, m-waterfall ...
app.component(componentName, defineAsyncComponent(value))
```

**组件分层**：

| 层级 | 位置 | 示例 |
|---|---|---|
| **基础组件** | `libs/` | m-button, m-input, m-svg-icon |
| **容器组件** | `libs/` | m-waterfall, m-infinite-list, m-popup |
| **功能组件** | `libs/` | m-search, m-count-down, m-transition-router-view |
| **业务组件** | `views/.../components/` | header-search, navigation, list |
| **页面组件** | `views/` | main/index.vue, login/index.vue |

---

## 核心功能模块

### 1. PC/移动端双端适配

**实现方式**：

```js
// utils/flexible.js
// 1. UA 检测判断设备类型
export const isMobileTerminal = computed(() => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  )
})

// 2. 动态 REM 适配（移动端）
export const useREM = () => {
  const MAX_FONT_SIZE = 40
  document.addEventListener('DOMContentLoaded', () => {
    const html = document.querySelector('html')
    let fontSize = window.innerWidth / 10   // Iphone 6 → 37.5px
    fontSize = fontSize > MAX_FONT_SIZE ? MAX_FONT_SIZE : fontSize
    html.style.fontSize = fontSize + 'px'
  })
}
```

**适配层次**：

```
第一层：路由级适配   → isMobileTerminal 决定使用 PC 还是移动端路由表
第二层：组件级适配   → 组件内 v-if/v-else 渲染不同版本
第三层：样式级适配   → Tailwind xl: 断点 (1280px) + REM 动态基准值
```

> **技巧**：`routerType` getter 在 PC 端永远返回 `'none'`（禁用路由动画），移动端根据 `state.app.routerType` 动态切换 push/back 动画。

---

### 2. 瀑布流布局组件

**核心算法** — 最小高度列填充：

```
┌────────────────────────────────────────────┐
│  初始化：每列高度 = 0                       │
│                                            │
│  循环每个 item：                            │
│    1. 找到当前高度最小的列                    │
│    2. 将 item 放入该列                       │
│    3. 该列高度 += item高度 + 行间距          │
│                                            │
│  最终容器高度 = 最高列的高度                   │
└────────────────────────────────────────────┘
```

**关键源码**（`libs/waterfall/utils.js`）：

```js
// 找最小高度列
export const getMinHeightColumn = (columnHeightObj) => {
  const minHeight = getMinHeight(columnHeightObj)
  return Object.keys(columnHeightObj).find(
    key => columnHeightObj[key] === minHeight
  )
}

// 指定列高度自增
const increasingHeight = (index) => {
  const minHeightColumn = getMinHeightColumn(columnHeightObj.value)
  columnHeightObj.value[minHeightColumn] += itemHeights[index] + props.rowSpacing
}
```

**图片预读取机制**：通过 `picturePreReading` 属性控制是否等待图片加载完成后再计算位置。开启时使用 `Promise.all` 监听所有图片 `onload`，确保位置计算精确。

**列数动态切换**：PC 端 5 列，移动端 2 列。切换时先将 `columnWidth` 置 0（清空渲染），`nextTick` 后重新计算列宽和位置。

---

### 3. 路由动画系统

**组件**：`m-transition-router-view`

**机制**：模拟原生 App 的 push/back 滑动动画

```
        push（前进）              back（后退）
    ┌──────────────┐        ┌──────────────┐
    │  新页面从右   │        │  当前页向右   │
    │  滑入 (100%  │        │  滑出 (50%)  │
    │  → 0%)       │        │              │
    │              │        │  上一页从左   │
    │  当前页向左   │        │  滑入 (-50%  │
    │  滑出 (-50%) │        │  → 0%)       │
    └──────────────┘        └──────────────┘
```

**虚拟任务栈**：维护一个 `virtualTaskStack` 数组，push 时入栈、back 时出栈，控制 `keep-alive` 的 `include` 动态缓存：

```js
const virtualTaskStack = ref([props.mainComponentName])

router.beforeEach((to, from) => {
  if (props.routerType === PUSH) {
    virtualTaskStack.value.push(to.name)    // 入栈 → 缓存新页面
  } else if (props.routerType === BACK) {
    virtualTaskStack.value.pop()             // 出栈 → 释放旧页面
  }
  if (to.name === props.mainComponentName) {
    clearTask()  // 回首页清空栈
  }
})
```

**使用方式**：

```js
// 跳转前设置 routerType
store.commit('app/changeRouterType', 'push')
router.push('/member')

// 返回时设置
store.commit('app/changeRouterType', 'back')
router.back()
```

---

### 4. 主题切换系统

**三种模式**：极简白 (light) / 极夜黑 (dark) / 跟随系统 (system)

**实现原理**：

```
┌──────────────────────────────────────────────────┐
│  store/theme.js                                  │
│  ┌────────────┐   commit     ┌────────────────┐  │
│  │ 用户点击    │──────────→  │ themeType 变更  │  │
│  └────────────┘              └───────┬────────┘  │
│                                      │ watch      │
│                          ┌───────────▼─────────┐  │
│                          │  utils/theme.js      │  │
│                          │  changeTheme()        │  │
│                          │  ├─ light → 'light'   │  │
│                          │  ├─ dark  → 'dark'    │  │
│                          │  └─ system → matchMedia│  │
│                          │     .matches ? dark   │  │
│                          │     : light           │  │
│                          └───────────┬─────────┘  │
│                                      │            │
│                          ┌───────────▼─────────┐  │
│                          │  html.className      │  │
│                          │  = 'light' | 'dark'  │  │
│                          └─────────────────────┘  │
│                                                   │
│  Tailwind darkMode: 'class'                       │
│  → dark:bg-zinc-800 等 class 自动生效             │
└──────────────────────────────────────────────────┘
```

**系统主题监听**：通过 `window.matchMedia('(prefers-color-scheme: dark)')` 监听系统主题变化，自动同步。

---

### 5. 用户认证体系

```
┌─────────────────────────────────────────────────┐
│                  登录流程                        │
│                                                 │
│  ┌──────────┐   ┌──────────┐   ┌────────────┐  │
│  │ 用户名密码 │   │ QQ 登录  │   │ 微信登录    │  │
│  └────┬─────┘   └────┬─────┘   └─────┬──────┘  │
│       │              │               │          │
│       ▼              ▼               ▼          │
│  ┌──────────┐   ┌──────────┐   ┌──────────┐    │
│  │ MD5 加密 │   │ SDK 授权 │   │ 扫码授权  │    │
│  │ + 滑块   │   │ + 回调   │   │ + 回调   │    │
│  │ 验证码   │   │          │   │          │    │
│  └────┬─────┘   └────┬─────┘   └────┬─────┘    │
│       │              │               │          │
│       ▼              ▼               ▼          │
│  ┌──────────────────────────────────────────┐   │
│  │         /sys/login (POST)                 │   │
│  │         → token 存入 store/user          │   │
│  │         → 持久化到 localStorage           │   │
│  └──────────────────────────────────────────┘   │
│                                                 │
│  第三方登录特殊处理：                              │
│  - 首次登录返回 code: 204 → 跳转注册页            │
│  - 通过 BroadcastChannel 跨页面传递 OAuth 数据    │
│  - 降级方案：localStorage 事件监听               │
└─────────────────────────────────────────────────┘
```

**跨页面通信**（`brodacast.js`）：QQ/微信登录在弹窗中完成，通过 `BroadcastChannel` API 将结果传回主页面，不支持时降级为 `localStorage` + `storage` 事件。

---

### 6. 图片详情与 GSAP 动画

点击瀑布流中的图片卡片，从点击位置弹出大图详情：

```js
// 记录点击时图片的中心位置
const imgContainerCenter = () => {
  const { x, y, width, height } = imgTarget.value.getBoundingClientRect()
  return {
    translateX: parseInt(x + width / 2),
    translateY: parseInt(y + height / 2)
  }
}

// 进入动画：从点击位置缩放弹出
const beforeEnter = (el) => {
  gsap.set(el, {
    scaleX: 0, scaleY: 0,
    transformOrigin: '0 0',
    translateX: currentPins.value.localtion?.translateX,
    translateY: currentPins.value.localtion?.translateY,
    opacity: 0
  })
}
const enter = (el, done) => {
  gsap.to(el, {
    duration: 0.3,
    scaleX: 1, scaleY: 1, opacity: 1,
    translateX: 0, translateY: 0,
    onComplete: done
  })
}
```

同时通过 `history.pushState` 修改 URL，监听 `popstate` 事件处理浏览器后退关闭。

---

### 7. 搜索系统

```
┌────────────────────────────────────────────┐
│            header-search/index.vue         │
│  ┌──────────────────────────────────────┐  │
│  │  m-search (输入框 + 防抖500ms)        │  │
│  └──────────────┬───────────────────────┘  │
│                 │                           │
│     ┌───────────┼───────────┐              │
│     ▼           ▼           ▼              │
│  ┌──────┐ ┌──────┐ ┌──────────┐           │
│  │ hint │ │history│ │  theme   │           │
│  │ 搜索  │ │ 搜索  │ │  推荐    │           │
│  │ 提示  │ │ 历史  │ │  主题    │           │
│  └──────┘ └──────┘ └──────────┘           │
│                                             │
│  搜索历史管理（store/search.js）：            │
│  - unshift 新记录（去重）                    │
│  - 超过 10 条自动删除最早                    │
│  - 支持单条删除 + 全部清空                   │
└────────────────────────────────────────────┘
```

---

### 8. VIP 会员与支付

```
会员页面 (/member)
├── 套餐卡片列表（水平滚动选择）
│   ├── 连续包月（¥9，热销角标）
│   ├── 1个月（¥19）
│   ├── 3个月（¥50）
│   └── 12个月（¥188）
├── 支付模块（PC/移动端双版本）
│   ├── PC：支付宝支付按钮
│   └── 移动端：底部支付栏 + 支付方式选择
└── 倒计时组件（限时特惠 52min 倒计时 → dayjs duration）
```

**支付流程**：选择套餐 → 请求支付宝下单接口 → 跳转支付宝 → 支付完成回跳 → 查询支付结果

---

### 9. 引导页系统

使用 `driver.js` 实现 6 步引导：

```js
// steps.js
[
  { element: '.guide-home',     title: 'logo',   description: '点击可返回首页' },
  { element: '.guide-search',   title: '搜索',   description: '搜索您期望的图片' },
  { element: '.guide-theme',    title: '风格',   description: '选择一个您喜欢的风格' },
  { element: '.guide-my',       title: '账户',   description: '这里标记了您的账户信息' },
  { element: '.guide-start',    title: '引导',   description: '这里可再次查看引导信息' },
  { element: '.guide-feedback', title: '反馈',   description: '您的任何不满都可以在这里告诉我们' }
]
```

---

### 10. 图片处理

| 功能 | 技术方案 |
|---|---|
| **懒加载** | `v-lazy` 指令 — `useIntersectionObserver` + `IntersectionObserver` |
| **下载** | `file-saver` → `saveAs(photoDownLink, filename)` |
| **全屏预览** | `@vueuse/core` → `useFullscreen(imgTarget)` |
| **分享** | 微博分享 API → 自动拼接图片链接和页面 URL |
| **头像裁剪** | `cropperjs` → 裁剪后通过阿里云 OSS STS 直传 |
| **占位色** | `randomRGB()` → 图片加载前显示随机背景色 |

---

## API 接口文档

| 接口 | 方法 | 路径 | 说明 |
|---|---|---|---|
| 图片列表 | GET | `/pexels/list` | page, size, categoryId, searchText |
| 搜索提示 | GET | `/pexels/hint` | q=搜索内容 |
| 推荐主题 | GET | `/pexels/themes` | 热门主题推荐 |
| 图片详情 | GET | `/pexels/:id` | 单图数据 |
| 分类列表 | GET | `/category` | 所有分类 |
| 用户注册 | POST | `/sys/register` | username, password(MD5) |
| 用户登录 | POST | `/sys/login` | username, password(MD5) / OAuth |
| 验证码 | POST | `/sys/captcha` | behavior 行为数组 |
| 用户信息 | GET/PUT | `/user/profile` | 获取/修改个人资料 |
| OSS STS | GET | `/user/sts` | 阿里云临时上传凭证 |
| VIP 套餐 | GET | `/user/vip/pay/list` | 套餐列表 |
| 支付宝下单 | GET | `/user/alipay` | subject, totalAmount, body |
| 支付结果 | GET | `/sys/pay/result` | out_trade_no 订单号 |

### 请求规范

```js
// request.js — Axios 拦截器
请求拦截：
  headers.icode = 'helloqianduanxunlianying'
  headers.Authorization = `Bearer ${token}`  // 自动注入

响应拦截：
  success: true  → return data
  success: false → message('warn', message)
  401           → store.dispatch('user/logout')  // 自动登出
```

---

## 关键技术解析

### 1. 函数式组件调用

`message()` 和 `confirm()` 通过 `h()` + `render()` 动态挂载到 `document.body`，无需在模板中声明：

```js
// libs/message/index.js (简化)
export const message = (type, text) => {
  const vnode = h(MessageComponent, { type, text })
  const container = document.createElement('div')
  document.body.appendChild(container)
  render(vnode, container)
  // 2s 后自动销毁
  setTimeout(() => {
    render(null, container)
    document.body.removeChild(container)
  }, 2000)
}
```

### 2. SVG 图标方案

```
vite-plugin-svg-icons
  ├── 构建时扫描 src/assets/icons/*.svg
  ├── 生成 SVG Symbol（避免 DOM 冗余）
  └── m-svg-icon 组件通过 <use> 引用

使用：
  <m-svg-icon name="search" fillClass="fill-zinc-900" />
  → <svg><use href="#icon-search" /></svg>
```

### 3. 持久化策略

`vuex-persistedstate` 只持久化 `category`、`theme`、`search`、`user` 四个模块到 localStorage key `imooc-front`，`app` 模块（currentCategory、searchText、routerType）不持久化，每次刷新重置。

### 4. REM 响应式

移动端使用 REM 方案：`html.fontSize = min(window.innerWidth / 10, 40)`，Tailwind 的 `spacing` 自动使用 rem 单位，实现等比缩放。

### 5. 性能优化

| 优化点 | 方案 |
|---|---|
| 路由懒加载 | `() => import('@/views/...')` 动态导入 |
| 组件异步注册 | `defineAsyncComponent` 按需加载 |
| 图片懒加载 | `IntersectionObserver` 可视区域检测 |
| keep-alive 缓存 | 虚拟任务栈精确控制缓存范围 |
| API 数据持久化 | 分类/主题等基础数据 localStorage 缓存 |

---

## 环境变量

```env
# .env.development（开发环境）
VITE_BASE_API=/api        # Vite 代理到 https://api.imooc-front.lgdsunday.club/

# .env.production（生产环境）
VITE_BASE_API=https://api.imooc-front.lgdsunday.club/api
```

---

## 构建部署

```bash
# 构建
npm run build        # 输出到 dist/

# 预览
npm run preview      # 预览构建结果
```

构建产物结构与线上一致：
```
dist/
├── index.html              # 入口（含第三方 CDN 脚本）
├── favicon.ico
└── assets/
    ├── index.[hash].js     # 主 chunk（~720KB）
    ├── index.[hash].css    # 主样式（~30KB）
    └── ...                 # 代码分割的异步 chunk
```

> **注意**：`index.html` 中的 QQ 登录 SDK、微博分享 SDK、iconfont 图标库来自 CDN，构建时不会打包进 bundle。

---

## 项目来源

本项目基于慕课网课程《前中台前端综合解决方案》源码，原始仓库使用 Vue 3 + Vite + Tailwind CSS 构建。

- **原始在线地址**：[https://imooc-front.lgdsunday.club/](https://imooc-front.lgdsunday.club/)
- **GitHub 仓库**：[https://github.com/Yran-nloy7/imooctext](https://github.com/Yran-nloy7/imooctext)

> 📌 根据原内容复制，有待改进增加新的内容。
