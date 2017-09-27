import * as EventEmitter from 'events'
import Player from './Player'
import Card from './cards/Base'
import DeadQueueItem from './utils/DeadQueueItem'
import gameStart from './acts/gameStart'
import nextTurn from './acts/nextTurn'

const defaultConfig = {
  players: [
    {
      hero: 'Mage',
      cards: [
        'BabblingBook', 'BabblingBook', 'BabblingBook', 'BabblingBook', 'BabblingBook',
        'BabblingBook', 'BabblingBook', 'BabblingBook', 'BabblingBook', 'BabblingBook',
      ],
    },
    {
      hero: 'Mage',
      cards: [
        'BabblingBook', 'BabblingBook', 'BabblingBook', 'BabblingBook', 'BabblingBook',
        'BabblingBook', 'BabblingBook', 'BabblingBook', 'BabblingBook', 'BabblingBook',
      ],
    }
  ]
}

/**
 * 一局游戏
 * 
 * @export
 * @class Game
 * @extends {EventEmitter}
 */
export default class Game extends EventEmitter {
  /**
   * 玩家列表
   * 
   * @type {Player[]}
   * @memberof Game
   */
  players: Player[]

  /**
   * 当前回合
   * 
   * @type {number}
   * @memberof Game
   */
  turn: number = 0

  /**
   * 阵亡的随从
   * 
   * @type {DeadQueueItem[]}
   * @memberof Game
   */
  deadQueue: DeadQueueItem[]

  /**
   * 排队要做的事情
   * 
   * @type {Function[]}
   * @memberof Game
   */
  todoQueue: Function[]

  /**
   * Creates an instance of Game.
   * @param {Object} [config=defaultConfig] 
   * @memberof Game
   */
  constructor(config: { players: Object[] } = defaultConfig) {
    super()
    this.players = config.players.map((x: { hero: string, cards: string[] }) => {
      return new Player(this, x.hero, x.cards)
    })
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
      //异步
      result.then(() => {
        this.tick()
      })
    } else {
      //同步
      this.tick()
    }
  }

}