import TaskBase from  './TaskBase'
import Player from '../Player'
import EventTypes from '../EventTypes'

/**
 * 初始卡牌结果
 */
class DrawCardDuring extends TaskBase {
  /**
   * 构造
   */
  constructor(player,card){    
    super()
    
    this.player = player
    this.card = card
  }

  /**
   * 处理事件
   * @return {Promise=}
   */
  handle(){
    
  }


  /**
   * 获取玩家
   * @return {Player}
   */
  getPlayer(){
    return this.player
  }
}

export default DrawCardDuring