// ==================== QQ 登录回调检测（心月互联代理） ====================
// 流程：QQ 授权 → 心月代理 /api/callback.php → 转发到 localhost:3002#access_token=XXX
// 弹出窗口加载此页面时，提取 token 并通过 BroadcastChannel 传给主窗口
const QQ_LOGIN_CHANNEL = 'LOGIN_SUCCESS_CHANNEL'
;(function handleQQCallback() {
  const hash = window.location.hash
  if (hash && hash.includes('access_token')) {
    const match = hash.match(/access_token=([^&]+)/)
    if (match) {
      const accessToken = match[1]
      const uid = hash.match(/openid=([^&]+)/)?.[1]
      const oauthData = { accessToken, uid }
      // 通过 BroadcastChannel 发送给主窗口
      if (window.BroadcastChannel) {
        const channel = new BroadcastChannel(QQ_LOGIN_CHANNEL)
        channel.postMessage(oauthData)
        channel.close()
      } else {
        localStorage.setItem(QQ_LOGIN_CHANNEL, JSON.stringify(oauthData))
      }
      // 清除 hash，避免重复处理
      history.replaceState(null, '', window.location.pathname)
      // 如果是弹出窗口则关闭
      if (window.opener) {
        window.close()
      }
    }
  }
})()

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import mLibs from './libs'
import mDirective from './directives'
import { useREM } from './utils/flexible'
import useTheme from './utils/theme'
import './permission'

import './styles/index.scss'
import 'virtual:svg-icons-register'

// 设置 rem
useREM()
// 初始化主题
useTheme()
createApp(App).use(router).use(store).use(mLibs).use(mDirective).mount('#app')
