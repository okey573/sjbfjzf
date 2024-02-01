<template>
  <a-card class="game cursor-pointer" @click="check">
    <template #title>
      <div class="teams">
        <span v-content-game-model:home />
        <span class="mx-10 font-12">VS</span>
        <span v-content-game-model:guest />
      </div>
    </template>

    <template #extra>
      <a-checkbox v-model:checked="game.checked" />
    </template>

    <div class="game-group mt-1">
      <div class="group-name group-name--color2">让球</div>
      <div class="group-detail">
        <div class="group-detail-item" v-for="item in HANDICAP_RESULT_BETS">
          <div class="group-detail-item-name">{{ item.name }}</div>
          <div class="group-detail-item-odds" v-content-game-model:[item.key].number></div>
        </div>
      </div>
    </div>
  </a-card>
</template>

<script setup lang="ts">
  import type { Game } from '@/types.js'
  import { HANDICAP_RESULT_BETS } from '@/constants.js'
  import { effectiveOdd } from '@/utils/index.js'

  const props = defineProps<{
    game: Game
  }>()
  const checked = defineModel<boolean>('checked')

  const vContentGameModel = {
    mounted(el, binding) {
      const { arg, modifiers: { number = false } } = binding
      const v = props.game[arg]
      el.innerHTML = v || ''
      if (number) {
        el.parentNode.classList.add(effectiveOdd(v) ? 'effective' : 'ineffective')
      }
    }
  }

  const check = () => {
    props.game.checked = !props.game.checked
  }
</script>

<style scoped lang="scss">
  @import "@/styles/game.scss";
</style>
