import Player from '../Player'
import Base from './Base'

export default class Tired extends Base {
  player: Player
  emptyDrawCount: number = 0

  constructor(player: Player, emptyDrawCount: number = 0) {
    super(player)
    this.type = 'Tired'
    this.emptyDrawCount = emptyDrawCount
  }

  /**
   * 增加疲劳次数
   * 
   * @param {number} [by=1] 
   * @memberof Tired
   */
  addEmptyDrawCount(by: number = 1) {
    this.emptyDrawCount += by
  }

  /**
   * 获取疲劳伤害
   * 
   * @returns 
   * @memberof Tired
   */
  getEmpytDrawDamage() {
    return this.emptyDrawCount
  }
}