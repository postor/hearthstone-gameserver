import TaskBase from  './TaskBase'
import DrawCardBegin from  './DrawCardBegin'
import DrawCardDuring from  './DrawCardDuring'
import DrawCardEnd from  './DrawCardEnd'
import Player from '../Player'
import EventTypes from '../EventTypes'

/**
 * 初始卡牌结果
 */
class DrawCard extends TaskBase {
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
    var gameScene = this.getPlayer().getGameScene()
    gameScene.enqueueItems([
      new DrawCardBegin(this.player,this.card),
      new DrawCardDuring(this.player,this.card),
      new DrawCardEnd(this.player,this.card),      
    ],true)  
  }


  /**
   * 获取玩家
   * @return {Player}
   */
  getPlayer(){
    return this.player
  }
}

export default DrawCard