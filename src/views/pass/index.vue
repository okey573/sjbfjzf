<template>
  <a-tabs type="line" centered v-model:activeKey="applicationStore.passWay" @change="changeTab">
    <a-tab-pane key="accumulator" tab="混合过关">
      <WrapperGame :exist="applicationStore.accumulatorList.length > 0">
        <GameAccumulator v-for="game in applicationStore.accumulatorList" :game="game" />
      </WrapperGame>
    </a-tab-pane>

    <a-tab-pane key="result" tab="胜平负">
      <WrapperGame :exist="applicationStore.resultList.length > 0">
        <GameResult v-for="game in applicationStore.resultList" :game="game" />
      </WrapperGame>
    </a-tab-pane>

    <a-tab-pane key="handicapResult" tab="让球胜平负">
      <WrapperGame :exist="applicationStore.handicapResultList.length > 0">
        <GameHandicapResult v-for="game in applicationStore.handicapResultList" :game="game" />
      </WrapperGame>
    </a-tab-pane>

    <a-tab-pane key="total" tab="总进球">
      <WrapperGame :exist="applicationStore.totalList.length > 0">
        <GameTotal v-for="game in applicationStore.totalList" :game="game" />
      </WrapperGame>
    </a-tab-pane>

    <a-tab-pane key="doubleResult" tab="半全场">
      <WrapperGame :exist="applicationStore.doubleResultList.length > 0">
        <GameDoubleResult v-for="game in applicationStore.doubleResultList" :game="game" />
      </WrapperGame>
    </a-tab-pane>

    <a-tab-pane key="score" tab="比分">
      <WrapperGame :exist="applicationStore.scoreList.length > 0">
        <GameScore v-for="game in applicationStore.scoreList" :game="game" />
      </WrapperGame>
    </a-tab-pane>
  </a-tabs>
</template>

<script setup lang="ts">
  import { useApplicationStore } from '@/stores/application.ts'
  import WrapperGame from '@/views/pass/WrapperGame.vue'
  import GameAccumulator from '@/views/pass/GameAccumulator.vue'
  import GameResult from '@/views/pass/GameResult.vue'
  import GameHandicapResult from '@/views/pass/GameHandicapResult.vue'
  import GameTotal from '@/views/pass/GameTotal.vue'
  import GameDoubleResult from '@/views/pass/GameDoubleResult.vue'
  import GameScore from '@/views/pass/GameScore.vue'

  defineOptions({
    name: 'Pass'
  })

  const applicationStore = useApplicationStore()

  const changeTab = () => {
    applicationStore.checkPassWayAll()
  }
</script>

