import {shuffle} from 'lodash'
import cardLib from './cards'
import Card from './Card'
import EventTypes from './EventTypes'

/**
 * 套牌
 */
class CardSuit {
  constructor(cards){
    this.player = null
    this.cards = cards
    this.weapon = null
    this.inHand = []
    this.inStore = []
    this.inField = []
  }

  /**
   * 获取卡片数组
   * @return {Card[]} 
   */
  init(isFirst,player){
    this.palyer = player
    this.emptyDrawCount = 0
    this._initStore()
  }

  /**
   * 获取默认的套牌
   */
  static getDefault(){
    return new CardSuit(require('./cardsuits/test'))
  }

  /**
   * 将套牌初始化到牌库
   */
  _initStore(){
    this.inStore = Object.keys(this.cards).reduce((result,k)=>{
      for(var i=0;i<this.cards[k];i++){
        result.push(new Card(cardLib[k],this.player))
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
    }else{
      this.emptyDrawCount++
      this.palyer.emit('queue',{damage:this.emptyDrawCount})
    }
  }

  addCard2Store(id){
    this.inStore.push(new Card(cardLib[id],this.player))
  }

  /**
   * 取出一张牌的信息，可用于抽取，也可用于对比
   * @param {number=} index 如果有值，则获取指定位置的牌
   *  
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
}