import EventEmitter from 'events'
import CardSuit from './CardSuit'
import EventTypes from './EventTypes'
/**
 * 先手初始抽3张牌
 * @type {number}
 */
const FIRST_INIT_CHOOSE_CARD_COUNT = 3

/**
 * 后手初始抽4张牌
 * @type {number}
 */
const SECOND_INIT_CHOOSE_CARD_COUNT = 4

/**
 * 最大水晶数和水晶上限都是10
 * @type {number}
 */
const MANA_MAX = 10

/**
 * 玩家
 */
class Player  extends EventEmitter {
  /**
   * 绑定数据
   * @param {Object} bindings
   * @param {CardSuit=} bindings.cardSuit
   * @param {GameScene} gameScene
   */
  
  constructor(gameScene,bindings){
    /**
     * @member {GameScene} 游戏
     */
    this.gameScene = gameScene
    bindings = bindings||{}

    /**
     * @member {Object} 绑定数据
     */
    this.bindings = bindings

    /**
     * @member {CardSuit} 卡牌
     */
    this.cardSuit = bindings.cardSuit?new CardSuit(bindings.cardSuit):CardSuit.getDefault()

    /**
     * 
     * @member {number} 水晶数
     */
    this.mana = 0

    /**
     * 
     * @member {number} 水晶格子数
     */
    this.manaLimit = 0
  }

  /**
   * 设置敌人
   * @param {Player} player
   */
  setEnemyPlayer(player){
    this.enemy = player
  }

  /**
   * 获取敌人
   * @return {Player}
   */
  getEnemyPlayer(){
    return this.enemy
  }

  /**
   * 手牌中添加
   */
  addCard2Hand(cardID){
    this.getCardSuit().addCard2Hand(cardID)
  }

  /**
   * 开始的时候抽几张牌，等待替换
   * @param {boolean} isFirst 是否先手
   */
  initChoose(isFirst){
    this.cardSuit.init()
    this.drawCard(isFirst
      ?FIRST_INIT_CHOOSE_CARD_COUNT
      :SECOND_INIT_CHOOSE_CARD_COUNT)
    this.emit('queue',{
      event:EventTypes.INIT_CARDS_RESULT,
      cards: this.cardSuit
    })
  }

  /**
   * 抽若干张牌
   * @param {number} num 个数
   */
  drawCard(num){
    num = num || 1
    for(var i=0;i<num;i++){
      if(this.getCardSuit().storeIsEmpty()){
        this.getCardSuit().drawCard()
      }else{
        
      }
    }
  }

  /**
   * 增加水晶
   * @param {number} num 个数
   */
  addMana(num){
    this.mana+=num
    if(this.mana>MANA_MAX){
      this.mana = MANA_MAX
    }
  }

  /**
   * 增加水晶上限
   * @param {number} num 个数
   */
  addManaLimit(num){
    this.manaLimit+=num
    if(this.manaLimit>MANA_MAX){
      this.manaLimit = MANA_MAX
    }
  }


  //----getters----

  /**
   * 获取套牌
   * @return {CardSuit}
   */
  getCardSuit(){
    return this.cardSuit
  }
}

export default  Player