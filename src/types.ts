import { DEFINITION } from '@/constants.ts'

const ALL_BETS = DEFINITION.map(d => d.bets).flat()

export type Game = {
  // id
  id: string,
  // 是否被选中
  checked: boolean,

  // 主队
  home: string,
  // 客队
  guest: string
} & {
  [key in typeof ALL_BETS[number]['key']]: number
}

export type PassWay = typeof DEFINITION[number]['key']
