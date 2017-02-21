import GameObject from './GameObject'
import * as CardLib from './cards'

/**
 * 卡片类型
 * @enum
 */
const CARD_TYPE_MAP = {
  Spell:SpellCard,
  Weapon:WeaponCard,
  Minions:MinionCard
}

/**
 * 卡牌
 */
class Card extends GameObject {

  /**
   * 得到一张卡牌
   * @param id
   * @param player
   * @return Card
   */
  static  getCard(id,player){
    var type = CARD_TYPE_MAP[CardLib[id].type]
    return new type(id,player)
  }

  /**
   * 获取卡片类型
   * @return {CARD_TYPE_MAP}
   */
  getType(){
    return this.cardInfo.type
  }

  /**
   * @param {string} id 卡片id，对应cards/${id}.js
   * @param {Player} player 属于
   */
  constructor(id,player){
    this.cardID = id
    this.cardInfo = Object.assign({},CardLib[id])
    this.player = player
  }
}

/**
 * 法术牌
 */
class SpellCard extends Card {

}

/**
 * 武器牌
 */
class WeaponCard extends Card {

}

/**
 * 随从牌
 */
class MinionCard extends Card {
  onUse(pos){
    //出牌之前
    this.player.gameScene.pushEvent({
      action: 'beforeUse',
      player: this.player,
      card: this
    })
    //召唤随从
    this.player.gameScene.pushEvent({
      action: 'addMinion',
      player: this.player,
      position: pos,
      card: this
    })
    //有战吼的触发战吼
    this.cardInfo.onBattleCry && this.player.gameScene.pushEvent({
      action: 'addMinion',
      player: this.player,
      position: pos,
      card: this
    })
    //使用之后
    this.player.gameScene.pushEvent({
      action: 'afterUse',
      player: this.player,
      card: this
    })
  }
}

export default  Card
export {MinionCard,SpellCard,WeaponCard}