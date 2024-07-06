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

    <div class="game-group" @click.stop>
      <div class="group-name">比分</div>
      <div class="group-detail group-detail--score">
        <div v-for="item in SCORE_BETS"
             class="group-detail-item"
             :class="getClazz(item.key).concat({'group-detail-item--span3': item.name === '胜其它' || item.name === '负其它'})"
             @click="checkBet(item)">
          <div class="group-detail-item-name">{{ item.name }}</div>
          <div class="group-detail-item-odds" v-content-game-model:[item.key].number></div>
        </div>
      </div>
    </div>
  </a-card>
</template>

<script setup lang="ts">
  import type { Game } from '@/types.js'
  import { SCORE_BETS } from '@/constants.js'
  import { effectiveOdd } from '@/utils/index.js'
  import { BetKey, BetName } from '@/types.js'

  const props = defineProps<{
    game: Game
  }>()
  const checked = defineModel<boolean>('checked')

  const getClazz = (key: BetKey) => {
    const v = props.game[key]
    const clazz = []
    if (props.game.checkedBet.includes(key)) {
      clazz.push('group-detail-item--checked')
    }
    if (effectiveOdd(v)) {
      clazz.push('cursor-pointer')
    } else {
      clazz.push('cursor-not-allowed')
    }
    return clazz
  }
  const checkBet = (bet: {name: BetName, key: BetKey}) => {
    const v = props.game[bet.key]
    if (!effectiveOdd(v)) return
    const index = props.game.checkedBet.findIndex(item => item === bet.key)
    if (index > -1) {
      props.game.checkedBet.splice(index, 1)
    } else {
      props.game.checkedBet.push(bet.key)
    }
  }

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
