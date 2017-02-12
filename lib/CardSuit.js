import {shuffle} from 'lodash'
import cardLib from './cards'
import Card from './Card'

/**
 * 套牌
 */
class CardSuit {
  constructor(cards){
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
  init(isFirst){
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
        result.push(new Card(cardLib[k]))
      }
    },[])
  }

  drawCard(index){
    var picked = this._pickOne(index)
    if(picked){      
      this.inHand.push(picked.card)
      this.inStore.splice(picked.index,1)
    }else{
      console.log('')
    }
  }

  _pickOne(index){    
    if(typeof index === 'undefined'){
      index =  Math.floor(Math.random() * (this.inStore.length + 1))
    }
    
    return {
      index: index,
      card: this.inStore[index]
    }
  }
}