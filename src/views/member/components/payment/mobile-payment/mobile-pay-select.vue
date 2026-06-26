<template>
  <div class="py-2 h-[80vh] flex flex-col">
    <h2 class="text-xl text-zinc-900 dark:text-zinc-200 font-bold mb-2 px-1">
      选择支付方式
    </h2>
    <!-- 支付宝 -->
    <div
      class="flex items-center px-2 py-2 border-b border-b-zinc-200 dark:border-b-zinc-600 active:bg-zinc-200 dark:active:bg-zinc-900"
      @click="onAlipay"
    >
      <img class="w-4 h-4" src="@/assets/images/alipay.png" alt="" />
      <p class="text-xl ml-1 text-zinc-800 dark:text-zinc-200">支付宝</p>
    </div>
  </div>
</template>

<script setup>
import { message } from '@/libs'
import { useRouter } from 'vue-router'

const props = defineProps({
  payData: {
    required: true,
    type: Object
  }
})

const router = useRouter()
const onAlipay = () => {
  // 演示模式：跳过真实支付宝，直接跳转支付成功页
  message('success', '演示模式：正在模拟支付...', 2000)
  setTimeout(() => {
    router.push('/pay/result')
  }, 1500)
}
</script>
