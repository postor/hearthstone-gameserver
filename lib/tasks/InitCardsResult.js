import TaskBase from  './TaskBase'
import Player from '../Player'
import EventTypes from '../EventTypes'
import InitCardsReplace from './InitCardsReplace'

const INIT_CARDS_REPLACE_WAIT = 30*1000 

/**
 * 初始卡牌结果
 */
class InitCardsResult extends TaskBase {
  /**
   * 构造
   */
  constructor(player,cards){    
    super()
    
    this.player = player
    this.cards = cards
  }

  /**
   * 处理事件
   * @return {Promise=}
   */
  handle(){
    return Promise.race(
      [
        new Promise((resolve,reject)=>{
          var player = this.getPlayer()
          player.once(EventTypes.INIT_CARDS_REPLACE,(obj)=>{
            if(!obj.replaceIndexes || !obj.replaceIndexes.length){
              //没有选择变更卡牌            
              this.emit('queue',new InitCardsReplace(player))
              resolve()
              return
            }
            this.emit('queue',new InitCardsReplace(player,obj.replaceIndexes))
            resolve()
          })      
        }
      ),
      new Promise((resolve,reject)=>{
        setTimeout(()=>{
          this.emit('queue',new InitCardsReplace(player))
          resolve()
        },INIT_CARDS_REPLACE_WAIT)
      })
    ])
  }


  /**
   * 获取玩家
   * @return {Player}
   */
  getPlayer(){
    return this.player
  }
}

export default InitCardsResult