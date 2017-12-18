import Hero from './heros/Base'
import { Game } from './Game'
import { Card } from './cards/Base'
import Servant from './servants/Base'
import Trigger from './triggers/Base'
import Buff from './buffs/Base'
import Weapon from './weapons/Base'
import Secret from './secrets/Base'
import getHero from './heros'
import getCard from './cards'

/**
 * 玩家
 * 
 * @export
 * @class Player
 * @extends {Trigger}
 */
export default class Player extends Trigger {
  isPlayer = true
  /**
   * 血量
   * 
   * @type {number}
   * @memberof Player
   */
  health: number = 30

  coin: number
  coinMax: number
  isFrosted = false

  /**
   * 英雄
   * 
   * @type {Hero}
   * @memberof Player
   */
  hero: Hero

  /**
   * 武器
   * 
   * @type {Weapon}
   * @memberof Player
   */
  weapon: Weapon

  /**
   * 牌库里的卡牌
   * 
   * @type {Card[]}
   * @memberof Player
   */
  storeCards: Card[] = []

  /**
   * 手上的卡牌
   * 
   * @type {Card[]}
   * @memberof Player
   */
  handCards: Card[] = []

  /**
   * 战场上的随从
   * 
   * @type {Servant[]}
   * @memberof Player
   */
  fieldServants: Servant[] = []

  /**
   * 奥秘
   * 
   * @type {Secret[]}
   * @memberof Player
   */
  secrets: Secret[] = []

  /**
   * 状态（克苏恩、子弹上膛）
   * 
   * @type {Buff[]}
   * @memberof Player
   */
  buffs: Buff[] = []


  /**
   * 所处游戏
   * 
   * @type {Game}
   * @memberof Player
   */
  game: Game

  /**
   * 编号、index
   * 
   * @type {number}
   * @memberof Player
   */
  id: number

  constructor(game: Game, hero: string, store: string[], id: number) {
    super(game)
    this.hero = getHero(this, hero)
    this.storeCards = store.map((x) => {
      return getCard(this, x)
    })
    this.id = id
  }

  /**
   * 获取敌方player
   * 
   * @returns 
   * @memberof Player
   */
  getEnemy() {
    return this.game.players.filter((x) => x !== this)[0]
  }

  getBuffBytType(type: string) {
    return this.buffs.filter((x) => (x.type === type))
  }

  removeBuff(buff: Buff) {
    const index = this.buffs.indexOf(buff)
    if (index >= 0) {
      this.buffs.splice(index, 1)
    }
  }

  removeBuffByType(type: string) {
    const buffs = this.getBuffBytType(type)
    buffs.forEach((b) => this.removeBuff(b))
  }
}