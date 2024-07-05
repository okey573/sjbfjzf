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
      'id': '5d2z9r89',
      'home': '德国',
      'guest': '西班牙',
      'win$': 5.26,
      'draw$': 4.25,
      'lose$': 1.42,
      'checked': true,
      checkedBet: []
    },
    {
      'id': 'U67zGNos',
      'home': '葡萄牙',
      'guest': '法国',
      'win': 0,
      'draw': 0,
      'lose': 0,
      'win$': 1.53,
      'draw$': 3.85,
      'lose$': 4.65,
      'checked': true,
      checkedBet: []
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
