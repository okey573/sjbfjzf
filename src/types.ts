import { DEFINITION } from '@/constants.ts'

const ALL_BETS = DEFINITION.map(d => d.bets).flat()

console.log('ALL_BETS', ALL_BETS)

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


// export type Game2 = {
//   // id
//   id: string,
//   // 是否被选中
//   checked: boolean,
//
//   // 主队
//   home: string,
//   // 客队
//   guest: string
// } & {
//   [key in typeof result[number]['key']]: number
// } & {
//   [key in typeof handicapResult[number]['key']]: number
// } & {
//   [key in typeof score[number]['key']]: number
// } & {
//   [key in typeof total[number]['key']]: number
// } & {
//   [key in typeof doubleResult[number]['key']]: number
// }
//
// export type PassWay2 = 'accumulator' | 'result' | 'handicapResult' | 'total' | 'doubleResult' | 'score'


/*
  // 主胜
  win: number,
  // 平
  draw: number,
  // 客胜
  lose: number



  // 主胜[让]
  win$: number,
  // 平[让]
  draw$: number,
  // 客胜[让]
  lose$: number,


  // 1:0
  $1_0: number,
  // 2:0
  $2_0: number,
  // 2:1
  $2_1: number,
  // 3:0
  $3_0: number,
  // 3:1
  $3_1: number,
  // 3:2
  $3_2: number,
  // 4:0
  $4_0: number,
  // 4:1
  $4_1: number,
  // 4:2
  $4_2: number,
  // 5:0
  $5_0: number,
  // 5:1
  $5_1: number,
  // 5:2
  $5_2: number,
  // 胜其它
  otherWin: number,

  // 0:0
  $0_0: number,
  // 1:1
  $1_1: number,
  // 2:2
  $2_2: number,
  // 3:3
  $3_3: number,
  // 平其它
  otherDraw: number,

  // 0:1
  $0_1: number,
  // 0:2
  $0_2: number,
  // 1:2
  $1_2: number,
  // 0:3
  $0_3: number,
  // 1:3
  $1_3: number,
  // 2:3
  $2_3: number,
  // 0:4
  $0_4: number,
  // 1:4
  $1_4: number,
  // 2:4
  $2_4: number,
  // 0:5
  $0_5: number,
  // 1:5
  $1_5: number,
  // 2:5
  $2_5: number,
  // 负其它
  otherLose: number,

  // 总进球0
  total_0: number,
  // 总进球1
  total_1: number,
  // 总进球2
  total_2: number,
  // 总进球3
  total_3: number,
  // 总进球4
  total_4: number,
  // 总进球5
  total_5: number,
  // 总进球6
  total_6: number,
  // 总进球7+
  total_7: number,

  // 胜胜
  win_win: number,
  // 胜平
  win_draw: number,
  // 胜负
  win_lose: number,
  // 平胜
  draw_win: number,
  // 平平
  draw_draw: number,
  // 平负
  draw_lose: number,
  // 负胜
  lose_win: number,
  // 负平
  lose_draw: number,
  // 负负
  lose_lose: number,*/
