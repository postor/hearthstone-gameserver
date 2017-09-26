import * as EventEmitter from 'events'
import Player from './Player'
import Card from './cards/Base'
import DeadQueueItem from './utils/DeadQueueItem'
import gameStart from './acts/gameStart'
import nextTurn from './acts/nextTurn'

export default class Game extends EventEmitter {
  players: Player[]
  turn: number
  deadQueue: DeadQueueItem[]
  todoQueue: Function[]

  constructor(players: Player[]) {
    super()
    this.players = players
    this.players.forEach((x) => x.game = this)
    gameStart(this)
  }

  tick() {
    //没有事做了下一回合
    if (!this.todoQueue.length) {
      this.todoQueue.push(() => {
        nextTurn(this)
      })
    }

    //处理
    const fn = this.todoQueue.shift()
    const result = fn()
    if (result) {
      result.then(() => {
        this.tick()
      })
    } else {
      this.tick()
    }
  }

}