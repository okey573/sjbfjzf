import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import type { Game, PassWay } from '@/types.ts'
import { DOUBLE_RESULT_BETS, HANDICAP_RESULT_BETS, RESULT_BETS, SCORE_BETS, TOTAL_BETS } from '@/constants.js'
import { effectiveOdd } from '@/utils/index.js'

export const useApplicationStore = defineStore('applicationStore', () => {
  const currentStep = ref<Number | Boolean>(0)


  // 当前添加所有的比赛
  const games = ref<Array<Game>>([
    {
      'id': 'U67zGNos',
      'home': '西班牙',
      'guest': '英格兰',
      'win': 2.26,
      'draw': 2.67,
      'lose': 3.2,
      'win$': 5.5,
      'draw$': 3.75,
      'lose$': 1.47,
      'checked': true,
      'checkedBet': [],
      '$1_0': 6.65,
      '$2_0': 10.5,
      '$2_1': 8.5,
      '$3_0': 27,
      '$3_1': 22,
      '$3_2': 38,
      '$4_0': 100,
      '$4_1': 80,
      '$4_2': 100,
      '$5_0': 300,
      '$5_1': 275,
      '$5_2': 450,
      'otherWin': 175,
      '$0_0': 7,
      '$1_1': 4.8,
      '$2_2': 14,
      '$3_3': 50,
      'otherDraw': 400,
      '$0_1': 8.25,
      '$0_2': 16,
      '$1_2': 10.5,
      '$0_3': 55,
      '$1_3': 35,
      '$2_3': 45,
      '$0_4': 200,
      '$1_4': 175,
      '$2_4': 150,
      '$0_5': 500,
      '$1_5': 500,
      '$2_5': 600,
      'otherLose': 300,
      'total_0': 7,
      'total_1': 4.1,
      'total_2': 3.05,
      'total_3': 4.25,
      'total_4': 7.35,
      'total_5': 16,
      'total_6': 30,
      'total_7': 45,
      'win_win': 4.25,
      'win_draw': 14,
      'win_lose': 28,
      'draw_win': 5.4,
      'draw_draw': 4.15,
      'draw_lose': 6.5,
      'lose_win': 25,
      'lose_draw': 14,
      'lose_lose': 5.85
    }
  ])

  // 过关方式
  const passWay = ref<PassWay>('accumulator')

  // 可作为混合过关过关的比赛
  const accumulatorList = computed(() => {
    const keys = [...RESULT_BETS, ...HANDICAP_RESULT_BETS, ...SCORE_BETS, ...TOTAL_BETS, ...DOUBLE_RESULT_BETS].map(i => i.key)
    return games.value.filter(game => keys.some(key => effectiveOdd(game[key])))
  })
  // 可作为胜平负过关的比赛
  const resultList = computed(() => {
    const keys = [...RESULT_BETS].map(i => i.key)
    return games.value.filter(game => keys.some(key => effectiveOdd(game[key])))
  })
  // 可作为让球胜平负过关的比赛
  const handicapResultList = computed(() => {
    const keys = [...HANDICAP_RESULT_BETS].map(i => i.key)
    return games.value.filter(game => keys.some(key => effectiveOdd(game[key])))
  })
  // 可作为比分过关的比赛
  const scoreList = computed(() => {
    const keys = [...SCORE_BETS].map(i => i.key)
    return games.value.filter(game => keys.some(key => effectiveOdd(game[key])))
  })
  // 可作为总进球过关的比赛
  const totalList = computed(() => {
    const keys = [...TOTAL_BETS].map(i => i.key)
    return games.value.filter(game => keys.some(key => effectiveOdd(game[key])))
  })
  // 可作为半全场过关的比赛
  const doubleResultList = computed(() => {
    const keys = [...DOUBLE_RESULT_BETS].map(i => i.key)
    return games.value.filter(game => keys.some(key => effectiveOdd(game[key])))
  })


  const checkPassWayAll = () => {
    games.value.forEach(g => g.checked = false)
    if (passWay.value === 'accumulator') {
      accumulatorList.value.forEach(g => g.checked = true)
    } else if (passWay.value === 'result') {
      resultList.value.forEach(g => g.checked = true)
    } else if (passWay.value === 'handicapResult') {
      handicapResultList.value.forEach(g => g.checked = true)
    } else if (passWay.value === 'total') {
      totalList.value.forEach(g => g.checked = true)
    } else if (passWay.value === 'doubleResult') {
      doubleResultList.value.forEach(g => g.checked = true)
    } else if (passWay.value === 'score') {
      scoreList.value.forEach(g => g.checked = true)
    }
  }

  return {
    currentStep,
    games,
    passWay,

    accumulatorList,
    resultList,
    handicapResultList,
    scoreList,
    totalList,
    doubleResultList,

    checkPassWayAll,
  }
})
