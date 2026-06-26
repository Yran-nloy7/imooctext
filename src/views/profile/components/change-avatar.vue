<template>
  <div class="overflow-auto relative flex flex-col items-center">
    <m-svg-icon
      v-if="isMobileTerminal"
      name="close"
      class="w-3 h-3 p-0.5 m-1 ml-auto"
      fillClass="fill-zinc-900 dark:fill-zinc-200 "
      @click="close"
    ></m-svg-icon>

    <img class="" ref="imageTarget" :src="blob" />

    <m-button
      class="mt-4 w-[80%] xl:w-1/2"
      :loading="loading"
      @click="onConfirmClick"
    >
      确定
    </m-button>
  </div>
</template>

<script>
const EMITS_CLOSE = 'close'

// 移动端配置对象
const mobileOptions = {
  // 将裁剪框限制在画布的大小
  viewMode: 1,
  // 移动画布，裁剪框不动
  dragMode: 'move',
  // 裁剪框固定纵横比：1:1
  aspectRatio: 1,
  // 裁剪框不可移动
  cropBoxMovable: false,
  // 不可调整裁剪框大小
  cropBoxResizable: false
}

// PC 端配置对象
const pcOptions = {
  // 裁剪框固定纵横比：1:1
  aspectRatio: 1
}
</script>

<script setup>
import { isMobileTerminal } from '@/utils/flexible'
import Cropper from 'cropperjs'
import 'cropperjs/dist/cropper.css'
import { ref, onMounted } from 'vue'
import { getOSSClient } from '@/utils/sts'
import { message } from '@/libs'
import { useStore } from 'vuex'
import { putProfile } from '@/api/sys'

defineProps({
  blob: {
    type: String,
    required: true
  }
})

const emits = defineEmits([EMITS_CLOSE])

/**
 * 图片裁剪处理
 */
const imageTarget = ref(null)
let cropper = null
onMounted(() => {
  /**
   * 接收两个参数：
   * 1. 需要裁剪的图片 DOM
   * 2. options 配置对象
   */
  cropper = new Cropper(
    imageTarget.value,
    isMobileTerminal.value ? mobileOptions : pcOptions
  )
})

/**
 * 确定按钮点击事件
 */
const loading = ref(false)
const onConfirmClick = () => {
  loading.value = true
  cropper.getCroppedCanvas().toBlob((blob) => {
    // 演示模式：使用本地 blob URL，跳过 OSS 上传
    onChangeProfile(URL.createObjectURL(blob))
  })
}

/**
 * 进行 OSS 上传（演示模式已跳过，保留方法供生产使用）
 * 生产环境需要恢复此调用：putObjectToOSS(blob)
 */
let store = useStore()
const putObjectToOSS = async (file) => {
  // 演示模式：直接走本地模式
  const localUrl = URL.createObjectURL(file)
  onChangeProfile(localUrl)
}

/**
 * 上传新头像到服务器
 */
const onChangeProfile = async (avatar) => {
  // 更新本地数据
  store.commit('user/setUserInfo', {
    ...store.getters.userInfo,
    avatar
  })
  // 演示模式：只更新本地 store，不调服务器
  loading.value = false
  message('success', '头像更新成功（演示模式）')
  close()
}

/**
 * 关闭事件
 */
const close = () => {
  emits(EMITS_CLOSE)
}
</script>

<style lang="scss" scoped></style>
