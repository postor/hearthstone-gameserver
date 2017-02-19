import CardSuit from './CardSuit'
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
class Player {
  /**
   * 绑定数据
   * @param {Object} bindings
   * @param {CardSuit=} bindings.cardSuit
   * @param {GameScene} gameScene
   */
  constructor(bindings,gameScene){
    /**
     * @name Player#gameScene
     * @type GameScene
     */
    this.gameScene = gameScene
    bindings = bindings||{}
    this.bindings = bindings

    /**
     * @name Player#cardSuit
     * @type CardSuit
     */
    this.cardSuit = bindings.cardSuit?new CardSuit(bindings.cardSuit):CardSuit.getDefault()
    /**
     * 水晶数
     * @type {number}
     */
    this.mana = 0

    /**
     * 水晶格子数
     * @type {number}
     */
    this.manaLimit = 0
  }

  /**
   * 设置敌人
   */
  setEnemyPlayer(player){
    this.enemy = player
  }

  /**
   * 开始的时候抽几张牌，等待替换
   */
  initChoose(isFirst){
    this.cardSuit.init()
    this.drawCard(isFirst
      ?FIRST_INIT_CHOOSE_CARD_COUNT
      :SECOND_INIT_CHOOSE_CARD_COUNT)
  }

  /**
   * 抽若干张牌
   */
  drawCard(num){
    num = num || 1
    for(var i=0;i<num;i++){
      if(this.cardSuit.storeIsEmpty())this.cardSuit.drawCard()
    }
  }

  /**
   *
   * @param num
   */
  addMana(num){
    this.mana+=num
    if(this.mana>MANA_MAX){
      this.mana = MANA_MAX
    }
  }

  addManaLimit(num){
    this.manaLimit+=num
    if(this.manaLimit>MANA_MAX){
      this.manaLimit = MANA_MAX
    }
  }

}

export default  Player