import { EventEmitter } from 'events'
import Player from './Player'
import DeadQueueItem from './utils/DeadQueueItem'
import gameStart from './acts/gameStart'
import { getWaitPromise } from './utils/getWaitPromise'

const defaultConfig = {
  players: [
    {
      hero: 'Mage',
      cards: [
        'ArcaneExplosion', 'ArcaneExplosion', 'ArcaneIntellect', 'ArcaneIntellect', 'FrostBolt', 'FrostBolt',
        'BloodmageThalnos', 'BloodmageThalnos', 'ArcaneMissiles', 'ArcaneMissiles',
        'Polymorph', 'Polymorph', 'FireBall', 'FireBall', 'MirrorImage', 'MirrorImage', 'FrostNova', 'FrostNova',
      ],
    },
    {
      hero: 'Mage',
      cards: [
        'ArcaneExplosion', 'ArcaneExplosion', 'ArcaneIntellect', 'ArcaneIntellect', 'FrostBolt', 'FrostBolt',
        'BloodmageThalnos', 'BloodmageThalnos', 'ArcaneMissiles', 'ArcaneMissiles',
        'Polymorph', 'Polymorph', 'FireBall', 'FireBall', 'MirrorImage', 'MirrorImage', 'FrostNova', 'FrostNova',
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
export class Game extends EventEmitter {
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
   * 游戏结束
   * 
   * @type {boolean}
   * @memberof Game
   */
  gameover: boolean = false

  _curID: number = 10

  _toClean: any = () => { }

  setToClean(x: any) {
    this._toClean = x
  }

  clean() {
    this._toClean()
    this.removeAllListeners()
  }

  newID() {
    return this._curID++
  }

  /**
   * Creates an instance of Game.
   * @param {Object} [config=defaultConfig] 
   * @memberof Game
   */
  constructor(config: { players: Object[] } = defaultConfig) {
    super()
    this.setMaxListeners(30)
    this.players = config.players.map((x: { hero: string, cards: string[] }, i) => {
      return new Player(this, x.hero, x.cards, i)
    })
    this.players.forEach((x) => x.game = this)
  }

  async start() {
    gameStart(this)
    while (!this.gameover) {
      await this.tick()
    }
  }

  async tick() {
    //没有事做了等一下再试
    if (!this.todoQueue.length) {
      await getWaitPromise(100)
      return
    }

    //处理
    const fn = this.todoQueue.shift()
    const result = fn()

    if (result instanceof Promise) {
      //异步
      return result
    } else {
      //同步
      return Promise.resolve()
    }
  }


}