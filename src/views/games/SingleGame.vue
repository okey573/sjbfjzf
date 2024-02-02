<template>
  <a-card class="game">
    <template #title>
      <div class="teams">
        <span v-content-game-model:home />
        <span class="mx-10 font-12">VS</span>
        <span v-content-game-model:guest />
      </div>
    </template>

    <template #extra>
      <DeleteOutlined class="cursor-pointer" @click="deleteGame" />
      <!--<DragOutlined />-->
    </template>

    <div class="game-group">
      <div class="group-name">胜平负</div>
      <div class="group-detail">
        <div class="group-detail-item" v-for="item in RESULT_BETS">
          <div class="group-detail-item-name">{{ item.name }}</div>
          <div class="group-detail-item-odds" v-content-game-model:[item.key].number></div>
        </div>
      </div>
    </div>

    <div class="game-group mt-1">
      <div class="group-name group-name--color2">让球</div>
      <div class="group-detail">
        <div class="group-detail-item" v-for="item in HANDICAP_RESULT_BETS">
          <div class="group-detail-item-name">{{ item.name }}</div>
          <div class="group-detail-item-odds" v-content-game-model:[item.key].number></div>
        </div>
      </div>
    </div>

    <div class="game-group mt-20">
      <div class="group-name">比分</div>
      <div class="group-detail group-detail--score">
        <div v-for="item in SCORE_BETS" class="group-detail-item"
             :class="{'group-detail-item--span3': item.name === '胜其它' || item.name === '负其它'}">
          <div class="group-detail-item-name">{{ item.name }}</div>
          <div class="group-detail-item-odds" v-content-game-model:[item.key].number></div>
        </div>
      </div>
    </div>

    <div class="game-group mt-20">
      <div class="group-name group-name--color2">总进球</div>
      <div class="group-detail group-detail--total">
        <div class="group-detail-item" v-for="item in TOTAL_BETS">
          <div class="group-detail-item-name">{{ item.name }}</div>
          <div class="group-detail-item-odds" v-content-game-model:[item.key].number></div>
        </div>
      </div>
    </div>

    <div class="game-group mt-20">
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
  import { DeleteOutlined, DragOutlined } from '@ant-design/icons-vue'
  import { RESULT_BETS, HANDICAP_RESULT_BETS, SCORE_BETS, TOTAL_BETS, DOUBLE_RESULT_BETS } from '@/constants.ts'
  import type { Game } from '@/types.js'
  import { useApplicationStore } from '@/stores/application.js'

  const props = defineProps<{
    game: Game
  }>()

  const vContentGameModel = {
    created(el, binding) {
      const { arg, modifiers: { number = false } } = binding
      el.setAttribute('contenteditable', 'true')
      el.innerHTML = props.game[arg] || ''
      el.onblur = (e) => {
        props.game[arg] = number ? Number(e.target.innerText) : e.target.innerText
      }
    }
  }

  const applicationStore = useApplicationStore()
  const deleteGame = () => {
    applicationStore.games = applicationStore.games.filter(g => g.id !== props.game.id)
  }
</script>

<style scoped>
  @import "@/styles/game.scss";

  [contenteditable] {
    outline: 1px solid transparent;
    width: 95%;
    height: 95%;
  }

  [contenteditable]:focus {
    border: 1px solid #dcdfe6;
    border-radius: 3px;
  }
</style>
