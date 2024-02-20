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

    <div class="game-group cursor-not-allowed" @click.stop>
      <div class="group-name">胜平负</div>
      <div class="group-detail">
        <div class="group-detail-item" v-for="item in RESULT_BETS">
          <div class="group-detail-item-name">{{ item.name }}</div>
          <div class="group-detail-item-odds" v-content-game-model:[item.key].number></div>
        </div>
      </div>
    </div>

    <div class="game-group mt-1 cursor-not-allowed" @click.stop>
      <div class="group-name group-name--color2">让球</div>
      <div class="group-detail">
        <div class="group-detail-item" v-for="item in HANDICAP_RESULT_BETS">
          <div class="group-detail-item-name">{{ item.name }}</div>
          <div class="group-detail-item-odds" v-content-game-model:[item.key].number></div>
        </div>
      </div>
    </div>

    <div class="game-group mt-20 cursor-not-allowed" @click.stop>
      <div class="group-name">比分</div>
      <div class="group-detail group-detail--score">
        <div v-for="item in SCORE_BETS" class="group-detail-item"
             :class="{'group-detail-item--span3': item.name === '胜其它' || item.name === '负其它'}">
          <div class="group-detail-item-name">{{ item.name }}</div>
          <div class="group-detail-item-odds" v-content-game-model:[item.key].number></div>
        </div>
      </div>
    </div>

    <div class="game-group mt-20 cursor-not-allowed" @click.stop>
      <div class="group-name group-name--color2">总进球</div>
      <div class="group-detail group-detail--total">
        <div class="group-detail-item" v-for="item in TOTAL_BETS">
          <div class="group-detail-item-name">{{ item.name }}</div>
          <div class="group-detail-item-odds" v-content-game-model:[item.key].number></div>
        </div>
      </div>
    </div>

    <div class="game-group mt-20 cursor-not-allowed" @click.stop>
      <div class="group-name">半全场</div>
      <div class="group-detail">
        <div class="group-detail-item" v-for="item in DOUBLE_RESULT_BETS">
          <div class="group-detail-item-name">{{ item.name }}</div>
          <div class="group-detail-item-odds" v-content-game-model:[item.key].number></div>
        </div>
      </div>
    </div>
  </a-card>
</template>

<script setup lang="ts">
  import type { Game } from '@/types.js'
  import { RESULT_BETS, HANDICAP_RESULT_BETS, SCORE_BETS, TOTAL_BETS, DOUBLE_RESULT_BETS } from '@/constants.ts'
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
