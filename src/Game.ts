import { EventEmitter } from 'events'
import Player from './Player'
import Card from './cards/Base'
import DeadQueueItem from './utils/DeadQueueItem'
import gameStart from './acts/gameStart'

const defaultConfig = {
  players: [
    {
      hero: 'Mage',
      cards: [
        'BabblingBook', 'BabblingBook', 'BabblingBook', 'BabblingBook', 'BabblingBook',
        'QuestingAdventurer', 'QuestingAdventurer', 'QuestingAdventurer', 'QuestingAdventurer', 'QuestingAdventurer',
      ],
    },
    {
      hero: 'Mage',
      cards: [
        'BabblingBook', 'BabblingBook', 'BabblingBook', 'BabblingBook', 'BabblingBook',
        'QuestingAdventurer', 'QuestingAdventurer', 'QuestingAdventurer', 'QuestingAdventurer', 'QuestingAdventurer',
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
  players: Player[] = []

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
  deadQueue: DeadQueueItem[] = []

  /**
   * 排队要做的事情
   * 
   * @type {Function[]}
   * @memberof Game
   */
  todoQueue: Function[] = []

  /**
   * 当前
   * 
   * @type {Player}
   * @memberof Game
   */
  currentPlayer: Player

  /**
   * Creates an instance of Game.
   * @param {Object} [config=defaultConfig] 
   * @memberof Game
   */
  constructor(config: { players: Object[] } = defaultConfig) {
    super()
    this.players = config.players.map((x: { hero: string, cards: string[] }, i) => {
      return new Player(this, x.hero, x.cards, i)
    })
    this.players.forEach((x) => x.game = this)
    setTimeout(() => {
      gameStart(this)
      this.tick()
    }, 100)
  }

  tick() {
    //没有事做了等一下再试
    if (!this.todoQueue.length) {
      setTimeout(() => {
        this.tick()
      }, 100)
      return
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