<template>
  <div class="flex flex-col items-center cursor-pointer group" @click="$emit('demoLogin')">
    <m-svg-icon
      class="w-4"
      name="qq"
    ></m-svg-icon>
    <span class="text-xs text-zinc-400 mt-0.5 group-hover:text-zinc-600">QQ登录</span>
  </div>
</template>

<script setup>
defineEmits(['demoLogin'])
</script>
