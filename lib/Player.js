import CardSuit from './CardSuit'

const FIRST_INIT_CHOOSE_CARD_COUNT = 3
const SECOND_INIT_CHOOSE_CARD_COUNT = 4

class Player {
  /**
   * 绑定数据
   */
  constructor(bindings){
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

  initChoose(isFirst){
    this.cardSuit.init()
    this.drawCard(isFirst
      ?FIRST_INIT_CHOOSE_CARD_COUNT
      :SECOND_INIT_CHOOSE_CARD_COUNT)
  }


}