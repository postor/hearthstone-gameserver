import Game from '../Game'
import changeCard from './changeCard'
import drawCard from './drawCard'
import addCardByName from './addCardByName'
import nextTurn from './nextTurn'
import CardFromData from '../utils/CardFromData'
import UserActionEnums from '../utils/UserActionEnum'
import shuffle from '../utils/shuffle'
import config from '../config'


export default function (game: Game) {
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
    game.currentPlayer.getEnemy()
  })

  //wait
  let waiting = true
  return Promise.race([new Promise((resolve, reject) => {
    //30秒内有效否则换牌信号会被丢弃
    setTimeout(() => {
      waiting = false
      resolve()
    }, config.initCardChangeTimeout)
  }), Promise.all(game.players.map((player, i) => new Promise((resolve, reject) => {
    //30秒之前双方都交换完成则提前进入回合阶段
    game.once(`player${i}:${UserActionEnums.ChangeCards}`, (data = {}) => {
      const cardIndexes: number[] = data.cardIndexes || []
      cardIndexes.forEach((x) => {
        game.todoQueue.push(() => {
          changeCard(game, game.players[i], x)
        })
      })
      resolve()
    })
  })))]).then(() => {
    //后出手的给一个法力水晶作为补偿
    game.todoQueue.push(() => {
      addCardByName(game.currentPlayer.getEnemy(), 'Coin', new CardFromData())
    })

    //开始下一回合
    game.todoQueue.push(() => {
      nextTurn(this)
    })
  }).catch(console.log)
}