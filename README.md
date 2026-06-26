# NicNote — 小红书风格笔记发现社区

> Vue 3 + Vite + Tailwind CSS 全栈前端项目，涵盖瀑布流布局、PC/移动双端适配、QQ/微信 OAuth 登录、主题切换、GSAP 动画、VIP 支付等企业级技术方案。

---

## 目录

1. [项目定位](#项目定位)
2. [技术栈](#技术栈)
3. [快速开始](#快速开始)
4. [项目架构](#项目架构)
5. [代码详解](#代码详解)
   - [瀑布流组件](#1-瀑布流组件-m-waterfall)
   - [笔记卡片与模拟数据](#2-笔记卡片与模拟数据)
   - [PC/移动双端适配](#3-pc移动双端适配)
   - [路由动画系统](#4-路由动画系统)
   - [主题切换](#5-主题切换)
   - [QQ/微信 OAuth 登录](#6-qq微信-oauth-登录)
   - [演示登录模式](#7-演示登录模式)
   - [GSAP 图片详情动画](#8-gsap-图片详情动画)
   - [搜索系统](#9-搜索系统)
   - [VIP 支付](#10-vip-支付)
6. [部署指南](#部署指南)
7. [Logo 替换清单](#logo-替换清单)
8. [API 接口](#api-接口)

---

## 项目定位

NicNote 是一个**小红书风格的笔记发现社区**，专注于生活好物分享。项目保留原课程的全部核心技术架构（瀑布流算法、双路由表、Vuex 模块化、OAuth 第三方登录），并将视觉和业务场景全面改造为笔记社区风格。

### 与原课程项目的区别

| 维度 | 原课程 | NicNote |
|---|---|---|
| 品牌名 | 前中台解决方案 | NicNote |
| 主色调 | `#f44c58` 慕课红 | `#FF2442` 小红书红 |
| 业务场景 | Pexels 图片库 | 生活方式笔记社区 |
| 分类体系 | UI/UX、平面、插画… | 时尚穿搭、美妆护肤、美食探店… |
| 卡片 UI | 图片+标题+作者 | 封面图+渐变遮罩+标题叠图+点赞收藏数 |
| 社交数据 | 无 | 模拟点赞 0-10w + 收藏（远低于点赞） |
| 失效功能处理 | QQ/微信/支付宝/OSS 各需真实凭证 | 演示登录补齐 + mock 支付 + 本地头像 |
| 登录入口 | 仅真实表单 | 保留 QQ/微信代码 + 新增"一键演示登录" |

---

## 技术栈

| 层面 | 技术 | 版本 |
|---|---|---|
| 核心框架 | Vue 3 Composition API (`<script setup>`) | 3.2 |
| 构建 | Vite | 2.9 |
| 路由 | Vue Router 4 (History 模式) | 4.0 |
| 状态管理 | Vuex 4 + vuex-persistedstate | 4.0 / 4.1 |
| CSS | Tailwind CSS 3 + SCSS | 3.0 / 1.45 |
| HTTP | Axios + 拦截器 | 0.26 |
| 动画 | GSAP | 3.9 |
| 表单验证 | VeeValidate | 4.5 |
| 图片裁剪 | cropperjs | 1.5 |
| 工具 | @vueuse/core, dayjs, md5, file-saver | — |
| 引导页 | driver.js | 0.9 |
| 图标 | vite-plugin-svg-icons (SVG Symbol) | 2.0 |

---

## 快速开始

### 环境

- Node.js >= 16
- npm >= 7

### 安装运行

```bash
git clone https://github.com/Yran-nloy7/imooctext.git
cd imooctext

# 创建环境变量文件（已内置，克隆后无需操作）
# .env.development: VITE_BASE_API=/api

npm install
npm run dev        # → http://localhost:3000
```

### 构建生产版本

```bash
npm run build      # → dist/
npm run preview    # 预览构建结果
```

---

## 项目架构

```
src/
├── main.js                      # 入口：REM → 主题 → 插件 → 挂载
├── App.vue                      # 根：m-transition-router-view 动画容器
├── permission.js                # 路由守卫：meta.user 拦截未登录
│
├── api/                         # 接口层
│   ├── pexels.js                #   图片列表/搜索提示/推荐主题
│   ├── sys.js                   #   登录/注册/验证码/用户信息/STS
│   ├── category.js              #   分类列表
│   └── pay.js                   #   VIP 套餐/支付宝下单/支付结果
│
├── constants/index.js           # 常量：分类/主题/登录类型/OSS配置
│
├── libs/                        # UI 组件库（15个 m-* 组件）
│   ├── waterfall/               #   瀑布流容器（最小高度列算法）
│   ├── infinite-list/           #   无限滚动（IntersectionObserver）
│   ├── transition-router-view/  #   路由动画（push/back + keep-alive 栈）
│   ├── button/ input/ dialog/   #   基础组件
│   ├── popup/ popover/ navbar/  #   容器组件
│   ├── search/ count-down/      #   功能组件
│   ├── message/ confirm/        #   函数式调用（h + render）
│   └── svg-icon/                #   SVG Symbol 图标
│
├── router/                      # 双路由表
│   ├── index.js                 #   isMobileTerminal 动态选择
│   └── modules/
│       ├── pc-routes.js         #   layout 嵌套结构
│       └── mobile-routes.js     #   扁平结构
│
├── store/                       # Vuex 5模块
│   ├── modules/
│   │   ├── app.js               #   当前分类/搜索文本/路由类型
│   │   ├── category.js          #   分类列表（API + 默认降级）
│   │   ├── search.js            #   搜索历史（去重/倒序/10条上限）
│   │   ├── theme.js             #   主题类型 light/dark/system
│   │   └── user.js              #   token/userInfo/登录/注册/登出
│   ├── getters.js               #   全局计算属性
│   └── index.js                 #   vuex-persistedstate → localStorage
│
├── utils/
│   ├── flexible.js              #   isMobileTerminal (UA检测) + useREM
│   ├── theme.js                 #   主题切换 + matchMedia 系统监听
│   ├── request.js               #   Axios 实例 + 拦截器
│   ├── color.js                 #   randomRGB 随机占位色
│   └── sts.js, pay.js, share.js #   OSS/支付/分享工具
│
├── directives/modules/lazy.js   # v-lazy 图片懒加载指令
│
├── vendor/SliderCaptcha/        # 滑块验证码
│
├── styles/index.scss            # @tailwind 指令 + 滚动条样式
│
└── views/
    ├── layout/                  # PC 骨架：header(72px) + main + floating
    ├── main/                    # 首页：分类导航 + 瀑布流列表
    │   └── components/
    │       ├── navigation/      #   PC/移动端双版分类导航
    │       └── list/            #   无限滚动 + 瀑布流 + item卡片 + GSAP详情弹出
    ├── pins/                    # 图片大图详情
    ├── login-register/          # 登录/注册 + QQ/微信 + 演示登录
    ├── member/                  # VIP 套餐 + 支付（演示模式）
    ├── profile/                 # 个人资料编辑 + 头像裁剪
    ├── pay/                     # 支付结果
    └── error/404/               # 404
```

### 路由表

```
PC（嵌套）                      移动端（扁平）
/ → layout/                     /
  ├─ /        → main/            ├─ /pins/:id
  ├─ /pins/:id → pins/           ├─ /profile  🔒
  ├─ /profile → profile/  🔒     ├─ /member   🔒
  ├─ /member  → member/   🔒     ├─ /pay/result 🔒
  └─ /pay/result → pay/          ├─ /login
/login                           ├─ /register
/register                        └─ /404
/404
```

### Vuex 数据流

```
┌────────────────────────────────────────────┐
│  localStorage "nicnote"                     │
│  ┌──────────┬────────┬────────┬──────────┐ │
│  │ category │ theme  │ search │ user     │ │
│  │ (分类)    │ (主题)  │ (历史)  │ (token+  │ │
│  │          │        │        │  userInfo)│ │
│  └──────────┴────────┴────────┴──────────┘ │
│                     ↑ 持久化                │
│  ┌──────────────────────────────────────┐  │
│  │            Vuex Store                │  │
│  │  app (不持久化)                       │  │
│  │  ├─ currentCategory                  │  │
│  │  ├─ searchText                       │  │
│  │  └─ routerType (push/back/none)      │  │
│  └──────────────────────────────────────┘  │
└────────────────────────────────────────────┘
```

---

## 代码详解

### 1. 瀑布流组件 (m-waterfall)

**位置**：`src/libs/waterfall/index.vue` + `utils.js`

**核心算法** — 最小高度列贪心填充：

```
初始化：每列高度 = 0

遍历每个 item：
  1. 找到当前高度最小的列
  2. item._style.left = 该列序号 × (列宽 + 间距)
  3. item._style.top  = 该列当前高度
  4. 该列高度 += item高度 + 行间距

最终容器高度 = 最高列的高度
```

**关键代码** (`waterfall/utils.js`)：

```js
// 找到当前最小高度列
export const getMinHeightColumn = (columnHeightObj) => {
  const minHeight = getMinHeight(columnHeightObj)
  return Object.keys(columnHeightObj).find(
    key => columnHeightObj[key] === minHeight
  )
}

// 指定列高度自增
const increasingHeight = (index) => {
  const minHeightColumn = getMinHeightColumn(columnHeightObj.value)
  columnHeightObj.value[minHeightColumn] +=
    itemHeights[index] + props.rowSpacing
}
```

**列数动态切换**：PC 5 列 / 移动端 2 列。切换时 `columnWidth` 置 0 清空渲染，`nextTick` 后重新计算。

**图片预读取**：`picturePreReading` 为 true 时，`Promise.all` 等待所有图片 `onload` 后再计算位置，确保高度精确。

---

### 2. 笔记卡片与模拟数据

**位置**：`src/views/main/components/list/item.vue`

笔记卡片结构：
```
┌──────────────────┐
│                  │
│   封面图片        │  ← 随机背景色占位
│                  │
│  ┌──────────────┐│
│  │ 标题文字      ││  ← 渐变遮罩叠加
│  │ ♥ 3.2k ☆ 156 ││  ← 点赞/收藏数
│  └──────────────┘│
├──────────────────┤
│ ○ 作者名         │  ← 头像 + 名字
└──────────────────┘
```

**点赞收藏数模拟** (`list/index.vue` `injectSocialCounts`)：

```js
const injectSocialCounts = (list) => {
  list.forEach((item) => {
    if (item._likeCount === undefined) {
      const likeCount = Math.floor(Math.random() * 100001)  // 0 ~ 100000
      const saveRatio = 0.005 + Math.random() * 0.075       // 0.5% ~ 8%
      const saveCount = Math.floor(likeCount * saveRatio)   // 远低于点赞
      item._likeCount = likeCount
      item._saveCount = saveCount
    }
  })
}
```

**数字格式化** (`item.vue` `formatCount`)：
```js
const formatCount = (count) => {
  if (!count && count !== 0) return '0'
  if (count < 1000) return String(count)
  if (count < 10000) return (count / 1000).toFixed(1).replace(/\.0$/, '') + 'k'
  return (count / 10000).toFixed(1).replace(/\.0$/, '') + 'w'   // 中文习惯
}
// 例：856 → "856", 3200 → "3.2k", 56000 → "5.6w"
```

---

### 3. PC/移动双端适配

**第一层：路由级** — `isMobileTerminal` 动态选择路由表
```js
// router/index.js
const router = createRouter({
  history: createWebHistory(),
  routes: isMobileTerminal.value ? mobileTerminalRoutes : pcTerminalRoutes
})
```

**第二层：组件级** — `v-if/v-else` 双版本渲染
```vue
<navigation-vue>        <!-- 内部：isMobileTerminal ? mobile-nav : pc-nav -->
<list-vue>              <!-- 瀑布流列数：isMobileTerminal ? 2 : 5 -->
```

**第三层：样式级** — UA 检测 + REM 动态基准
```js
// utils/flexible.js
export const isMobileTerminal = computed(() => {
  return /Android|webOS|iPhone|iPad|iPod/i.test(navigator.userAgent)
})

export const useREM = () => {
  document.addEventListener('DOMContentLoaded', () => {
    let fontSize = window.innerWidth / 10
    fontSize = fontSize > 40 ? 40 : fontSize    // 最大 40px
    document.querySelector('html').style.fontSize = fontSize + 'px'
  })
}
```

Tailwind `xl:` 断点在 1280px 处切换 PC/移动端样式。

---

### 4. 路由动画系统

**位置**：`src/libs/transition-router-view/index.vue`

模拟原生 App push/back 滑动动画，通过**虚拟任务栈**管理 keep-alive：

```js
const virtualTaskStack = ref([props.mainComponentName])

router.beforeEach((to, from) => {
  transitionName.value = props.routerType

  if (props.routerType === PUSH) {
    virtualTaskStack.value.push(to.name)     // 入栈 → 缓存
  } else if (props.routerType === BACK) {
    virtualTaskStack.value.pop()             // 出栈 → 释放
  }
  if (to.name === props.mainComponentName) {
    clearTask()                               // 回首页清栈
  }
})
```

使用方式：跳转前设置路由类型
```js
store.commit('app/changeRouterType', 'push')   // 前进动画
router.push('/member')

store.commit('app/changeRouterType', 'back')   // 返回动画
router.back()
```

PC 端 `routerType` getter 永远返回 `'none'`，禁用动画。

---

### 5. 主题切换

**位置**：`src/utils/theme.js` + `src/store/modules/theme.js`

三模式：极简白 / 极夜黑 / 跟随系统

```js
const changeTheme = (theme) => {
  let themeClassName = ''
  switch (theme) {
    case THEME_LIGHT:  themeClassName = 'light'; break
    case THEME_DARK:   themeClassName = 'dark'; break
    case THEME_SYSTEM:
      watchSystemThemeChange()
      themeClassName = matchMedia.matches ? 'dark' : 'light'; break
  }
  document.querySelector('html').className = themeClassName
}
```

系统主题通过 `window.matchMedia('(prefers-color-scheme: dark)')` 实时监听。Tailwind `darkMode: 'class'` 配合 `dark:` 前缀切换。

---

### 6. QQ/微信 OAuth 登录

**QQ 登录** (`src/views/login-register/login/qq-login.vue`)：

两层机制并行：

| 层 | 机制 | 说明 |
|---|---|---|
| SDK 层 | `QC.Login()` | QQ 互联 JS SDK，自动处理弹窗和回调 |
| 手动层 | `window.open(QQ_LOGIN_URL)` + `BroadcastChannel` | PC 弹窗 + 跨页面通信 |

```js
// SDK 初始化
onMounted(() => {
  QC.Login({ btnId: 'qqLoginBtn' }, (data) => {
    QC.Login.signOut()
    const accessToken = /access_token=((.*))&expires_in/.exec(
      window.location.hash
    )[1]
    brodacast.send({ nickname: data.nickname, accessToken })
    oauthLogin(LOGIN_TYPE_QQ, oauthObj)
    window.close()
  })
})

// 手动弹窗
const openQQWindow = async () => {
  window.open(QQ_LOGIN_URL, ...)
  brodacast.wait().then(oauthObj => {
    oauthLogin(LOGIN_TYPE_QQ, oauthObj)
  })
}
```

**跨页面通信** (`brodacast.js`)：
- 优先使用 `BroadcastChannel` API
- 不支持时降级为 `localStorage` + `storage` 事件

**微信登录** (`weixin-login.vue`)：
同样流程：获取前置数据 → 弹窗扫码 → 获取 token/openid → 获取用户信息 → 登录

> **注意**：QQ 登录的 `appid: 101998494` 回调地址仅限 `imooc-front.lgdsunday.club/login`。部署到自有域名后需在 [QQ 互联](https://connect.qq.com/) 注册自己的应用。

---

### 7. 演示登录模式

**位置**：`src/views/login-register/login/index.vue`

一键跳过真实认证，直接注入 mock 用户数据：

```js
const onDemoLogin = () => {
  demoLoading.value = true
  setTimeout(() => {
    store.commit('user/setToken', 'demo-token-nicnote-2026')
    store.commit('user/setUserInfo', {
      username: 'NicNote用户',
      nickname: 'NicNote用户',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=nicnote',
      title: '生活分享家',
      company: 'NicNote',
      introduction: '在 NicNote 发现美好生活 ✨',
      vipLevel: 0
    })
    demoLoading.value = false
    message('success', '🎉 欢迎来到 NicNote！当前为演示模式', 4000)
    router.push('/')
  }, 800)
}
```

演示登录让面试官/用户无需注册就能体验完整功能。支付同样改为了演示模式（跳过支付宝，直接跳转支付成功页）。

---

### 8. GSAP 图片详情动画

**位置**：`src/views/main/components/list/index.vue`

点击瀑布流卡片 → 从点击位置缩放弹出大图：

```js
const imgContainerCenter = () => {
  const { x, y, width, height } = imgTarget.value.getBoundingClientRect()
  return {
    translateX: parseInt(x + width / 2),
    translateY: parseInt(y + height / 2)
  }
}

// 进入动画
const beforeEnter = (el) => {
  gsap.set(el, {
    scaleX: 0, scaleY: 0, opacity: 0,
    transformOrigin: '0 0',
    translateX: currentPins.value.localtion?.translateX,
    translateY: currentPins.value.localtion?.translateY
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

通过 `history.pushState` 修改 URL，`popstate` 事件监听浏览器后退关闭详情。

---

### 9. 搜索系统

**架构**：
```
m-search (输入框，防抖 500ms)
  ├─ hint.vue    → /pexels/hint?q=xxx 获取建议 + 关键词高亮
  ├─ history.vue → store/search 管理历史（去重、倒序、10条上限）
  └─ theme.vue   → /pexels/themes 热门推荐主题
```

搜索历史持久化到 localStorage，支持单条删除和全部清空。

---

### 10. VIP 支付

**位置**：`src/views/member/`

套餐卡片水平滚动选择 → PC/移动端双版支付 → 支付宝支付（演示模式跳过真实支付宝）：

```js
// PC 支付 — 演示模式
const onAliPayClick = () => {
  message('success', '演示模式：正在模拟支付...', 2000)
  setTimeout(() => router.push('/pay/result'), 1500)
}
```

倒计时组件基于 `dayjs duration`，限时特惠 52 分钟。

---

## 部署指南

### 方式一：Vercel（推荐，免费）

```bash
npm i -g vercel
cd E:\imooc-front-project
vercel --prod
# 按提示选择，构建命令：npm run build
# 输出目录：dist
```

### 方式二：GitHub Pages

```bash
# 1. vite.config.js 添加 base
export default defineConfig({
  base: '/imooctext/',    // 仓库名
  ...
})

# 2. 构建
npm run build

# 3. 推送到 gh-pages 分支
git checkout -b gh-pages
git add dist -f
git commit -m "deploy"
git push origin gh-pages
```

### 方式三：Nginx 服务器

```bash
npm run build
# 将 dist/ 上传到服务器
# Nginx 配置：
server {
    listen 80;
    server_name your-domain.com;
    root /var/www/nicnote/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /api/ {
        proxy_pass https://api.imooc-front.lgdsunday.club/;
        proxy_set_header Host $host;
    }
}
```

### 生产环境变量

部署前修改 `.env.production`：

```env
# 如果后端 API 在同一个域名下（通过 Nginx 代理）
VITE_BASE_API=/api

# 如果后端 API 在不同域名
VITE_BASE_API=https://api.imooc-front.lgdsunday.club/api
```

### 更换自己的 QQ 登录 AppID

1. 注册 [QQ 互联](https://connect.qq.com/) 开发者
2. 创建网站应用，填写回调地址（如 `https://your-domain.com/login`）
3. 获取 AppID
4. 修改 `index.html`：
```html
<script ... data-appid="YOUR_APP_ID" data-redirecturi="https://your-domain.com/login"></script>
```
5. 修改 `qq-login.vue` 中的 `QQ_LOGIN_URL`：
```js
const QQ_LOGIN_URL = `https://graph.qq.com/oauth2.0/authorize?client_id=YOUR_APP_ID&...&redirect_uri=https://your-domain.com/login`
```

---

## Logo 替换清单

| # | 位置文件 | 当前状态 | 建议尺寸 |
|---|---|---|---|
| 1 | `src/views/layout/components/header/index.vue` | 文字 "NicNote" | PNG 120×32 |
| 2 | `src/views/login-register/components/header.vue` (PC) | 文字 "NicNote" | PNG 200×60 |
| 3 | `src/views/login-register/components/header.vue` (移动端) | 纯色背景+文字 | 750×220 背景 + 180×40 Logo |
| 4 | `public/favicon.ico` | 原 favicon | 32×32 ICO |
| 5 | `index.html` `<title>` | "NicNote - 发现生活好物" | — |

---

## API 接口

所有接口代理到 `https://api.imooc-front.lgdsunday.club/api`。

| 接口 | 方法 | 路径 | 说明 |
|---|---|---|---|
| 图片列表 | GET | `/pexels/list` | page, size, categoryId, searchText |
| 搜索提示 | GET | `/pexels/hint` | q |
| 推荐主题 | GET | `/pexels/themes` | — |
| 图片详情 | GET | `/pexels/:id` | — |
| 分类 | GET | `/category` | — |
| 登录 | POST | `/sys/login` | username, password(MD5), loginType |
| 注册 | POST | `/sys/register` | username, password(MD5) |
| 验证码 | POST | `/sys/captcha` | behavior |
| 用户信息 | GET/PUT | `/user/profile` | — |
| VIP 套餐 | GET | `/user/vip/pay/list` | — |
| 支付宝下单 | GET | `/user/alipay` | subject, totalAmount, body |
| 支付结果 | GET | `/sys/pay/result` | out_trade_no |

### Axios 拦截器

```js
// 请求拦截
config.headers.icode = 'helloqianduanxunlianying'
config.headers.Authorization = `Bearer ${token}`

// 响应拦截
success === true  → return data
success === false → message('warn', message)
401               → store.dispatch('user/logout')
```

---

## 面试要点速查

| 考点 | 对应技术 | 文件位置 |
|---|---|---|
| 瀑布流算法 | 最小高度列贪心 + 图片预读 | `libs/waterfall/` |
| 响应式适配 | UA 检测 + REM + 双路由表 | `utils/flexible.js`, `router/` |
| 状态管理 | Vuex 5模块 + localStorage 持久化 | `store/` |
| OAuth 流程 | QQ SDK + BroadcastChannel 跨页通信 | `views/login-register/login/` |
| 路由动画 | push/back + 虚拟任务栈 + keep-alive | `libs/transition-router-view/` |
| 函数式组件 | h() + render() 动态挂载 | `libs/message/`, `libs/confirm/` |
| 主题切换 | matchMedia + Tailwind darkMode class | `utils/theme.js` |
| GSAP 动画 | scale + translate + transformOrigin | `views/main/components/list/` |
| 懒加载 | IntersectionObserver 指令 | `directives/modules/lazy.js` |
| 第三方登录集成 | QQ OAuth / WeChat OAuth 全流程代码 | `qq-login.vue`, `weixin-login.vue` |
