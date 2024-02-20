<template>
  <div class="games-wrapper mt-20">
    <TransitionGroup name="games-transition">
      <SingleGame v-for="game in applicationStore.games" :key="game.id" :game="game" />
    </TransitionGroup>
    <div class="ant-card ant-card-bordered add-single-game cursor-pointer"
         @click="addGame">
      <PlusOutlined :style="{fontSize: '40px'}" />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { PlusOutlined } from '@ant-design/icons-vue'
  import SingleGame from '@/views/games/SingleGame.vue'
  import { useApplicationStore } from '@/stores/application.ts'
  import type { Game } from '@/types.ts'
  import { nextId } from '@/utils/index.js'

  defineOptions({
    name: 'Games'
  })

  const applicationStore = useApplicationStore()
  const addGame = () => {
    applicationStore.games.push({
      id: nextId(),
      home: '主场',
      guest: '客场'
    } as Game)
  }
</script>

<style scoped lang="scss">
  .games-wrapper {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }

  .add-single-game {
    height: 735px;
    border: 1px rgb(238, 238, 238) solid;
    border-radius: 8px;
    background-color: white;
    width: 300px;
    display: flex;
    align-items: center;
    justify-content: center;

    > span {
      color: rgb(238, 238, 238);
    }
  }

  .add-single-game:hover {
    background-color: rgb(248, 248, 248);

    > span {
      color: #fff;
    }
  }

  .games-transition-enter-active {
    -webkit-animation-duration: 1s;
    animation-duration: 1s;
    -webkit-animation-duration: 1s;
    animation-duration: 1s;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
    -webkit-animation-name: zoomIn;
    animation-name: zoomIn;
  }

  .games-transition-leave-active {
    -webkit-animation-duration: .5s;
    animation-duration: .5s;
    -webkit-animation-duration: .5s;
    animation-duration: .5s;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
    -webkit-animation-name: zoomOut;
    animation-name: zoomOut;
  }

  .games-transition-leave-active {
    /*position: absolute;*/
  }
</style>
