<template>
  <a-input-number v-model:value="magnificationModel" placeholder="购买倍率" @pressEnter="calculate">
    <template #prefix>
      购买倍率：
    </template>

    <template #addonAfter>
      <a-button type="text" size="small" @click="calculate">
        计算
      </a-button>
    </template>
  </a-input-number>

  <Summary />

  <a-table v-if="dataSource.length"
           class="mt-20"
           size="small"
           bordered
           :dataSource="dataSource"
           :columns="columns"
           :pagination="pagination"
  />
</template>

<script setup lang="tsx">
  import { defineComponent, reactive, ref } from 'vue'
  import { useApplicationStore } from '@/stores/application.js'
  import { effectiveOdd } from '@/utils/index.js'
  import type { Game } from '@/types.js'
  import { renderNumber, renderPercentage, renderProfit, renderRatio } from '@/views/result/column-tools.js'
  import { message } from 'ant-design-vue'
  import { DEFINITION } from '@/constants.js'

  defineOptions({
    name: 'Result'
  })
  defineExpose({
    calculate: () => calculate()
  })

  const applicationStore = useApplicationStore()

  const pagination = reactive({
    hideOnSinglePage: false,
    pageSizeOptions: ['10', '20', '50', '100'],
    showSizeChanger: true,
    showQuickJumper: true,
    total: 0,
    showTotal: total => `共计： ${total}`
  })


  // 单注价格
  const singleBetPrice = 2
  // 买入倍率
  const magnification = ref<Number>(1)
  const magnificationModel = ref<Number>(1)
  // 总花费
  const totalCost = ref<Number>(0)
  // 中奖率
  const winningOdds = ref<Number>(1)

  const baseColumns = [
    {
      title: '总赔率',
      dataIndex: 'totalOdd',
      key: 'totalOdd',
      align: 'center',
      customRender: renderNumber
    },
    {
      title: '中奖率',
      dataIndex: 'winRatio',
      key: 'winRatio',
      align: 'center',
      customRender: renderPercentage,
    },
    {
      title: '奖金',
      dataIndex: 'bonus',
      key: 'bonus',
      align: 'center',
      customRender: renderNumber
    },
    {
      title: '盈亏',
      dataIndex: 'profit',
      key: 'profit',
      align: 'center',
      customRender: renderProfit
    },
    {
      title: '盈亏比',
      dataIndex: 'profitRatio',
      key: 'profitRatio',
      align: 'center',
      customRender: renderRatio
    }
  ]
  const columns = ref([])
  const dataSource = ref([])

  const calculate = () => {
    const games: Array<Game> = applicationStore.games.filter(g => g.checked)

    let tempColumns = []
    let tempSource = [{
      totalOdd: 1,
      winRatio: 1,
      bonus: singleBetPrice * magnificationModel.value,
      profit: 0,
      profitRatio: 0
    }]

    switch (applicationStore.passWay) {
      case 'accumulator':
        message.error('混合过关还不支持 嘤嘤嘤~')
        break
      case 'result':
      case 'handicapResult':
      case 'total':
      case 'doubleResult':
      case 'score':
        // 单场比赛可能出现的结果总数
        const define = DEFINITION.find(define => define.key === applicationStore.passWay)!
        const bets = define.bets! as Array<{key: string, name: string}>
        const singleGamePossibleCount = bets.length
        games.forEach((game: Game, index: number) => {
          const keyPrefix = `game_${index + 1}_`

          const gameInfo = `${game.home}（主） vs ${game.guest}（客）`
          const gameColumn = {
            title: gameInfo,
            align: 'center',
            children: []
          }
          gameColumn.children.push({
            title: define.passWay,
            children: [{
              title: `结果`,
              dataIndex: keyPrefix + applicationStore.passWay + '_bet',
              key: keyPrefix + applicationStore.passWay + '_bet',
              align: 'center',
            }, {
              title: `赔率`,
              dataIndex: keyPrefix + applicationStore.passWay + '_odd',
              key: keyPrefix + applicationStore.passWay + '_odd',
              align: 'center',
            }],
          })
          tempColumns.push(gameColumn)

          // 购买的结果
          const effectiveBets = bets.filter(r => effectiveOdd(game[r.key]))
          // 单场比赛中奖的概率
          const singleGameWinningOdds = effectiveBets.length / bets.length
          // 每场比赛的中奖概率乘起来就是总的中奖概率
          winningOdds.value *= singleGameWinningOdds

          const newTempSource = []
          for (const temp of tempSource) {
            for (const effectiveBet of effectiveBets) {
              const newRow = { ...temp }
              // 比赛信息
              newRow[keyPrefix + 'info'] = gameInfo
              // 结果
              newRow[keyPrefix + applicationStore.passWay + '_bet'] = effectiveBet.name
              // 赔率
              newRow[keyPrefix + applicationStore.passWay + '_odd'] = game[effectiveBet.key]
              // 总赔率
              newRow.totalOdd = game[effectiveBet.key] * temp.totalOdd
              // 中奖概率
              newRow.winRatio = (1 / singleGamePossibleCount) * temp.winRatio
              // 奖金
              newRow.bonus = game[effectiveBet.key] * temp.bonus

              newTempSource.push(newRow)
            }
          }
          tempSource = newTempSource
        })
        break
    }

    // 计算盈亏和盈亏比
    totalCost.value = tempSource.length * singleBetPrice * magnificationModel.value
    tempSource.forEach(temp => {
      temp.profit = temp.bonus - totalCost.value
      temp.profitRatio = temp.profit / totalCost.value
    })

    dataSource.value = tempSource
    columns.value = tempColumns.concat(baseColumns)

    magnification.value = magnificationModel.value
    pagination.total = dataSource.value.length
  }

  const Summary = defineComponent(() => {
    return () => {
      const checkedGames = applicationStore.games.filter(g => g.checked)
      const count = dataSource.value.length
      const profitCount = dataSource.value.filter(item => item.profit > 0).length
      return <div class="font-12">
        <p>
          共 {checkedGames.length} 场比赛：
          {checkedGames.map(game => `${game.home} vs ${game.guest}`).join('，')}。
          过关方式为 {DEFINITION.find(d => d.key === applicationStore.passWay).passWay}，
          {checkedGames.length} 串 1
        </p>

        <p>选择买入 {dataSource.value.length} 注， {magnification.value} 倍，总计花费 {totalCost.value} 元</p>

        <p>
          其中：{profitCount} 种盈利，中奖率为{renderPercentage({ text: winningOdds.value })}，
          盈利概率为 {renderPercentage({ text: winningOdds.value * profitCount / count })}
        </p>
      </div>
    }
  })
</script>
