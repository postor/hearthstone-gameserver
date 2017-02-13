import CardSuit from './CardSuit'

const FIRST_INIT_CHOOSE_CARD_COUNT = 3
const SECOND_INIT_CHOOSE_CARD_COUNT = 4

class Player {
  /**
   * 绑定数据
   */
  constructor(bindings,gameScene){
    this.gameScene = gameScene
    bindings = bindings||{}
    this.bindings = bindings
    /**
     * @member {CardSuit}
     */
    this.cardSuit = bindings.cardSuit?new CardSuit(bindings.cardSuit):CardSuit.getDefault()
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
      this.cardSuit.drawCard()
    }

  }

}