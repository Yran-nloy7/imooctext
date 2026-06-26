<template>
  <div
    class="bg-white dark:bg-zinc-900 rounded-lg overflow-hidden cursor-pointer group hover:shadow-md transition-shadow duration-200"
  >
    <!-- 封面图区域 -->
    <div
      class="relative w-full overflow-hidden"
      :style="{ backgroundColor: randomRGB() }"
      @click="onToPinsClick"
    >
      <img
        v-lazy
        ref="imgTarget"
        class="w-full bg-transparent object-cover"
        :src="data.photo"
        :style="{
          height: (width / data.photoWidth) * data.photoHeight + 'px'
        }"
      />
      <!-- 底部渐变遮罩 + 标题 -->
      <div
        class="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/60 via-black/30 to-transparent pt-6 pb-2 px-2"
      >
        <p
          class="text-white text-xs font-medium line-clamp-2 leading-tight mb-1"
        >
          {{ data.title }}
        </p>
      </div>
      <!-- 点赞 & 收藏数（右下角） -->
      <div
        class="absolute bottom-2 right-2 flex items-center gap-2 text-white/90 text-xs"
      >
        <span class="flex items-center gap-0.5">
          <svg class="w-1 h-1 fill-white/90" viewBox="0 0 24 24">
            <path
              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
            />
          </svg>
          {{ formatCount(data._likeCount) }}
        </span>
        <span class="flex items-center gap-0.5">
          <svg class="w-1 h-1 fill-white/90" viewBox="0 0 24 24">
            <path
              d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z"
            />
          </svg>
          {{ formatCount(data._saveCount) }}
        </span>
      </div>
    </div>
    <!-- 作者信息 -->
    <div class="flex items-center px-2 py-1.5" @click="onToPinsClick">
      <img
        v-lazy
        class="h-1.5 w-1.5 rounded-full object-cover flex-shrink-0"
        :src="data.avatar"
      />
      <span
        class="text-xs text-zinc-500 dark:text-zinc-400 ml-1 truncate"
      >{{ data.author }}</span>
    </div>
  </div>
</template>

<script setup>
import { randomRGB } from '@/utils/color'
import { ref } from 'vue'

const props = defineProps({
  data: {
    type: Object,
    required: true
  },
  width: {
    type: Number,
    default: 0
  }
})

const emits = defineEmits(['click'])

const imgTarget = ref(null)

/**
 * 计算图片中心点，用于 GSAP 弹出动画
 */
const imgContainerCenter = () => {
  const {
    x: imgContainerX,
    y: imgContainerY,
    width: imgContainerWidth,
    height: imgContainerHeight
  } = imgTarget.value.getBoundingClientRect()
  return {
    translateX: parseInt(imgContainerX + imgContainerWidth / 2),
    translateY: parseInt(imgContainerY + imgContainerHeight / 2)
  }
}

/**
 * 进入详情
 */
const onToPinsClick = () => {
  emits('click', {
    id: props.data.id,
    localtion: imgContainerCenter()
  })
}

/**
 * 格式化数字显示：<1000 原样，1000-9999 → 1.2k，>=10000 → 1.2w
 */
const formatCount = (count) => {
  if (!count && count !== 0) return '0'
  if (count < 1000) return String(count)
  if (count < 10000) return (count / 1000).toFixed(1).replace(/\.0$/, '') + 'k'
  return (count / 10000).toFixed(1).replace(/\.0$/, '') + 'w'
}
</script>
