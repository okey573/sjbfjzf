<template>
  <div class="games-wrapper mt-20">
    <TransitionGroup name="games-transition">
      <SingleGame v-for="game in applicationStore.games" :key="game.id" :game="game" />
    </TransitionGroup>
    <div class="ant-card ant-card-bordered games-operate">
      <div class="games-operate-item cursor-pointer" @click="uploadGames">
        <UploadOutlined class="font-40" />
        <span class="font-14">上传比赛</span>
      </div>
      <a-divider class="m-0" />
      <div class="games-operate-item cursor-pointer" @click="addGame">
        <PlusOutlined class="font-40" />
        <span class="font-14">添加比赛</span>
      </div>
      <a-divider class="m-0" />
      <div class="games-operate-item cursor-pointer" @click="downloadGames">
        <DownloadOutlined class="font-40" />
        <span class="font-14">保存比赛</span>
      </div>
    </div>
  </div>

  <input ref="fileUploadRef" type="file" style="display: none" accept=".json" @change="fileChange" />
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import { PlusOutlined, DownloadOutlined, UploadOutlined } from '@ant-design/icons-vue'
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

  const downloadGames = () => {
    const link = document.createElement('a')
    link.download = `games.json`
    link.href = 'data:text/plain,' + encodeURIComponent(JSON.stringify(applicationStore.games, null, 2))
    link.click()
  }

  const fileUploadRef = ref()
  const uploadGames = () => {
    fileUploadRef.value?.click()
  }
  const fileChange = () => {
    if (fileUploadRef.value && fileUploadRef.value.files) {
      const file = fileUploadRef.value.files[0]
      const fileReader = new FileReader()
      fileUploadRef.value.value = ''
      fileReader.onload = (e) => {
        applicationStore.games = (JSON.parse(e.target.result as string))
      }
      fileReader.readAsText(file)
    }
  }
</script>

<style scoped lang="scss">
  .games-wrapper {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }

  .games-operate {
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

  .games-operate {
    flex-direction: column;

    &-item {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 100%;

      > span, > div {
        color: rgb(238, 238, 238);
      }
    }

    &-item:hover {
      background-color: rgb(248, 248, 248);

      > span, > div {
        color: #fff;
      }
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
