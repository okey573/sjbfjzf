export const RESULT_BETS = <const>[
  { name: '主胜', key: 'win' },
  { name: '平', key: 'draw' },
  { name: '客胜', key: 'lose' },
]

export const HANDICAP_RESULT_BETS = <const>[
  { name: '主胜[让]', key: 'win$' },
  { name: '平[让]', key: 'draw$' },
  { name: '客胜[让]', key: 'lose$' },
]

export const SCORE_BETS = <const>[
  { name: '1:0', key: '$1_0' },
  { name: '2:0', key: '$2_0' },
  { name: '2:1', key: '$2_1' },
  { name: '3:0', key: '$3_0' },
  { name: '3:1', key: '$3_1' },
  { name: '3:2', key: '$3_2' },
  { name: '4:0', key: '$4_0' },
  { name: '4:1', key: '$4_1' },
  { name: '4:2', key: '$4_2' },
  { name: '5:0', key: '$5_0' },
  { name: '5:1', key: '$5_1' },
  { name: '5:2', key: '$5_2' },
  { name: '胜其它', key: 'otherWin' },

  { name: '0:0', key: '$0_0' },
  { name: '1:1', key: '$1_1' },
  { name: '2:2', key: '$2_2' },
  { name: '3:3', key: '$3_3' },
  { name: '平其它', key: 'otherDraw' },

  { name: '0:1', key: '$0_1' },
  { name: '0:2', key: '$0_2' },
  { name: '1:2', key: '$1_2' },
  { name: '0:3', key: '$0_3' },
  { name: '1:3', key: '$1_3' },
  { name: '2:3', key: '$2_3' },
  { name: '0:4', key: '$0_4' },
  { name: '1:4', key: '$1_4' },
  { name: '2:4', key: '$2_4' },
  { name: '0:5', key: '$0_5' },
  { name: '1:5', key: '$1_5' },
  { name: '2:5', key: '$2_5' },
  { name: '负其它', key: 'otherLose' },
]

export const TOTAL_BETS = <const>[
  { name: '0', key: 'total_0' },
  { name: '1', key: 'total_1' },
  { name: '2', key: 'total_2' },
  { name: '3', key: 'total_3' },
  { name: '4', key: 'total_4' },
  { name: '5', key: 'total_5' },
  { name: '6', key: 'total_6' },
  { name: '7+', key: 'total_7' },
]

export const DOUBLE_RESULT_BETS = <const>[
  { name: '胜胜', key: 'win_win' },
  { name: '胜平', key: 'win_draw' },
  { name: '胜负', key: 'win_lose' },
  { name: '平胜', key: 'draw_win' },
  { name: '平平', key: 'draw_draw' },
  { name: '平负', key: 'draw_lose' },
  { name: '负胜', key: 'lose_win' },
  { name: '负平', key: 'lose_draw' },
  { name: '负负', key: 'lose_lose' },
]

export const DEFINITION = <const>[
  {
    passWay: '混合过关',
    key: 'accumulator',
    bets: [
      ...RESULT_BETS,
      ...HANDICAP_RESULT_BETS,
      ...SCORE_BETS,
      ...TOTAL_BETS,
      ...DOUBLE_RESULT_BETS,
    ]
  },
  {
    passWay: '胜平负',
    key: 'result',
    bets: RESULT_BETS
  },
  {
    passWay: '胜平负[让]',
    key: 'handicapResult',
    bets: HANDICAP_RESULT_BETS
  },
  {
    passWay: '比分',
    key: 'score',
    bets: SCORE_BETS
  },
  {
    passWay: '总进球',
    key: 'total',
    bets: TOTAL_BETS
  },
  {
    passWay: '半全场',
    key: 'doubleResult',
    bets: DOUBLE_RESULT_BETS
  }
]
