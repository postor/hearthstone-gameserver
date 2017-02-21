import {shuffle} from 'lodash'
import * as cardLib from './cards'
import Card from './Card'
import defaultCards from './cardsuits/test'
import EventTypes from './EventTypes'

/**
 * @module CardSuit
 * @class
 * 套牌
 */
class CardSuit {
  /**
   * 构造并初始化套牌
   * @param {boolean} isFirst
   * @param {Player} player
   * @param {Object} cards
   */
  constructor(isFirst,player,cards){
    this.cards = cards
    this.weapon = null
    this.inHand = []
    this.inStore = []
    this.inField = []
    this.palyer = player
    this.emptyDrawCount = 0
    this._initStore()
  }

  /**
   * 手中的牌
   * @return {Card[]}
   */
  getInHandCards(){
    return this.inHand
  }

  /**
   * 战场的牌
   * @return {Card[]}
   */
  getInFieldCards(){
    return this.inField
  }

  /**
   * 牌库的牌
   * @return {Card[]}
   */
  getInStoreCards(){
    return this.inStore
  }

  /**
   * 获取默认的套牌
   * @return {CardSuit}
   */
  static getDefault(isFirst,player){
    return new CardSuit(isFirst,player,defaultCards)
  }

  /**
   * 将套牌初始化到牌库
   */
  _initStore(){
    this.inStore = Object.keys(this.cards).reduce((result,cardID)=>{
      for(var i=0;i<this.cards[cardID];i++){
        result.push(Card.getCard(cardID,this.player))
      }
    },[])
  }

  /**
   * 抽一张牌
   * @param {number=} index 如果有值，则抽取指定位置的牌
   */
  drawCard(index){
    var picked = this.pickOne(index)
    if(picked){      
      this.inHand.push(picked.card)
      this.inStore.splice(picked.index,1)
      this.player.emit('queue',{
        event: EventTypes.DRAW_CARD,
        card: picked.card
      })
    }
  }

  /**
   * 牌库是否已经空了
   * @returns {boolean}
   */
  storeIsEmpty(){
    return this.inStore.length === 0
  }

  /**
   * 向牌库添加一张牌
   * @param id
   */
  addCard2Store(id){
    this.inStore.push(Card.getCard(cardLib[id],this.player))
  }

  /**
   * 取出一张牌的信息，可用于抽取，也可用于对比
   * @param {number=} index 如果有值，则获取指定位置的牌、
   * @return {Picked}
   */
  pickOne(index){    
    if(typeof index === 'undefined'){
      index =  Math.floor(Math.random() * (this.inStore.length + 1))
    }    
    return {
      index: index,
      card: this.inStore[index]
    }
  }

  /**
   * 获取玩家
   * @return {Player}
   */
  getPlayer(){
    return this.player
  }
}

export default CardSuit

/**
 * @typedef {Object} Picked
 * @property {number} index 卡片所在的位置
 * @property {Card} card 对应的卡片
 */