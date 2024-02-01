<template>
  <div class="games-wrapper">
    <slot></slot>
    <div v-if="!exist" class="not-exist">
      <a-empty description="没有符合条件的比赛" />
    </div>
  </div>
</template>

<script setup lang="ts">
  withDefaults(defineProps<{exist: boolean}>(), { exist: false })
</script>

<style scoped lang="scss">
  .games-wrapper {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;

    .not-exist {
      //height: 735px;
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
  }
</style>
