<template>
  <a-steps size="small" v-model:current="applicationStore.currentStep" :items @change="changeStep" />

  <div class="mt-20">
    <component :is="currentComp" ref="stepRef" />
  </div>
</template>

<script setup lang="ts">
  import { useApplicationStore } from '@/stores/application.ts'
  import Games from '@/views/games/index.vue'
  import Pass from '@/views/pass/index.vue'
  import Result from '@/views/result/index.vue'
  import { computed, markRaw, nextTick, ref } from 'vue'

  defineOptions({
    name: 'application'
  })

  const applicationStore = useApplicationStore()

  const currentComp = computed(() => {
    if (applicationStore.currentStep === 0) {
      return markRaw(Games)
    } else if (applicationStore.currentStep === 1) {
      return markRaw(Pass)
    } else {
      return markRaw(Result)
    }
  })

  const items = [
    {
      title: '编辑比赛'
    },
    {
      title: '过关方式'
    },
    {
      title: '计算结果'
    }
  ]

  const stepRef = ref()
  const changeStep = async (current) => {
    await nextTick()
    if (current === 1) {
      applicationStore.checkPassWayAll()
    } else if (current === 2) {
      stepRef.value.calculate?.()
    }
  }
</script>
