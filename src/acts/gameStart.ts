import { Game } from '../Game'
import changeCard from './changeCard'
import drawCard from './drawCard'
import addCardByName from './addCardByName'
import beforeTurn from './beforeTurn'
import shuffle from '../utils/shuffle'
import config from '../config'
import { Notify } from '../notifys/Base'
import { NotifyEnum } from '../utils/NotifyEnum'
import CardFromData from '../utils/CardFromData'
import { UserActionEnum } from '../utils/UserActionEnum'
import { cancleableWait } from '../utils/cancleableWait'

export default async function (game: Game) {
  game.emit(
    'notify',
    new Notify(
      `game start`,
      NotifyEnum.gameStart,
      -1,
    )
  )
  //shuffle first
  game.players.forEach((player) => {
    shuffle(player.storeCards)
  })

  //pick first cards  
  game.players.forEach((player) => {
    for (let i = 0; i < config.initDrawCardCount; i++) {
      game.todoQueue.unshift(() => {
        drawCard(player)
      })
    }
  })

  //roll first player
  const firstPlayerIndex = Math.round(Math.random())
  game.currentPlayer = game.players[firstPlayerIndex]
  game.todoQueue.unshift(() => {
    drawCard(game.currentPlayer.getEnemy())
  })
  game.todoQueue.push(() => {
    game.emit(
      'notify',
      new Notify(
        `first turn player is player${firstPlayerIndex}`,
        NotifyEnum.firstTurnPlayer,
        -1,
        firstPlayerIndex
      ).toObject()
    )
  })

  let listenners: any = []
  let rtn: any = await cancleableWait(config.initCardChangeTimeout)
  const { promise, cancle } = rtn
  Promise.race([
    Promise.all(game.players.map((player, i) => new Promise((resolve, reject) => {
      //30秒之前双方都交换完成则提前进入回合阶段
      const listenner = (data: any = {}) => {
        const cardIndexes: number[] = data.cardIndexes || []
        cardIndexes.forEach((x) => {
          game.todoQueue.push(() => {
            changeCard(game.players[i], x)
          })
        })
        resolve()
      }
      const name = `player_${i}:${UserActionEnum.ChangeCards}`
      listenners.push([name, listenner])
      game.once(name, listenner)
    })))
    ,
    //30秒内有效否则换牌信号会被丢弃
    promise
  ]).then(() => {
    cancle()()
    listenners.forEach((x: any) => {
      game.removeListener(x[0], x[1])
    })

    game.emit(
      'notify',
      new Notify(
        `init card exchange end`,
        NotifyEnum.initCardExchangeEnd,
        -1
      ).toObject()
    )

    //后出手的给一个法力水晶作为补偿
    game.todoQueue.push(() => {
      addCardByName(game.currentPlayer.getEnemy(), 'Coin', new CardFromData())
    })

    //开始下一回合
    game.todoQueue.push(() => {
      beforeTurn(game)
    })
  }).catch(console.log)

  return true
}