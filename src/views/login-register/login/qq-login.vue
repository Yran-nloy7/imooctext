<template>
  <div>
    <span id="qqLoginBtn" v-show="false"></span>
    <m-svg-icon
      class="w-4 cursor-pointer"
      name="qq"
      @click="onQQLogin"
    ></m-svg-icon>
  </div>
</template>

<script>
// 心月互联 QQ 登录代理
// 回调地址注册: http://localhost:3002 → Token: cad82102b4fe103e84700e8d54e33084
const PROXY_TOKEN = 'cad82102b4fe103e84700e8d54e33084'
const QQ_APP_ID = '101998494'
const PROXY_CALLBACK = `https://qq.wch666.com/api/callback.php?token=${PROXY_TOKEN}`
const QQ_LOGIN_URL = `https://graph.qq.com/oauth2.0/authorize?client_id=${QQ_APP_ID}&response_type=token&scope=all&redirect_uri=${encodeURIComponent(PROXY_CALLBACK)}`
</script>

<script setup>
import brodacast from './brodacast'
import { oauthLogin } from './oauth'
import { LOGIN_TYPE_QQ } from '@/constants'

/**
 * QQ 登录按钮 — 通过心月互联代理完成 OAuth
 * 流程：弹出QQ授权 → 授权完成 → 心月代理收到回调 → 转发到 localhost:3002
 *       → main.js 检测 access_token → 传递给当前页面 → 完成登录
 */
const onQQLogin = () => {
  window.open(
    QQ_LOGIN_URL,
    'oauth2Login_10609',
    'height=525,width=585, toolbar=no, menubar=no, scrollbars=no, status=no, location=yes, resizable=yes'
  )
  // 等待弹出窗口完成 QQ 登录后通过 BroadcastChannel 传回数据
  brodacast.wait().then(async (oauthObj) => {
    brodacast.clear()
    oauthLogin(LOGIN_TYPE_QQ, oauthObj)
  })
}
</script>
