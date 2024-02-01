<template>
  <a-config-provider
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
  import application from '@/views/index.vue'
</script>
