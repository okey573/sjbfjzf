<template>
  <a-config-provider
      :locale="zhCN"
      :theme="{
      token: {
        colorPrimary: 'rgb(255, 153, 0)',
      },
    }"
  >
    <div class="p-20">
      <application />
    </div>
  </a-config-provider>
</template>

<script setup lang="ts">
  import zhCN from 'ant-design-vue/es/locale/zh_CN'
  import application from '@/views/index.vue'
</script>
