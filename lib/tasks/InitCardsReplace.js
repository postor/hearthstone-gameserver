import TaskBase from  './TaskBase'
import Player from '../Player'
import EventTypes from '../EventTypes'


/**
 * 初始卡牌结果
 */
class InitCardsReplace extends TaskBase {
  /**
   * 构造
   */
  constructor(player,cardIndexes){    
    super()
    
    this.player = player
    this.cardIndexes = cardIndexes
  }

  /**
   * 处理事件，如果有需要替换的卡牌，则放到牌库且抽取相应数量的卡牌
   * @return {Promise=}
   */
  handle(){
    if(!this.cardIndexes || !this.cardIndexes.length){
      this.getPlayer().emit(EventTypes.INIT_CARDS_RESULT)
      return
    }
    var player = this.getPlayer()
    var cardSuit = player.getCardSuit()
    var inHandCards = cardSuit.getInHandCards()
    var toReplaceCards = inHandCards.filter((card,index)=>obj.replaceIndexes.indexOf(index)>=0)
    
    toReplaceCards.forEach((card)=>{
      player.emit('queue',{
        event:EventTypes.CARD_HAND_TO_STORE,
        card: card
      })
      cardSuit._initStore.push(card)
    })
    cardSuit.inHand = inHandCards.filter((card,index)=>!obj.replaceIndexes.indexOf(index)>=0)
    player.drawCard(toReplaceCards.length)
    player.emit('queue',)
  }


  /**
   * 获取玩家
   * @return {Player}
   */
  getPlayer(){
    return this.player
  }
}

export default InitCardsReplace