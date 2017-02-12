import GameObject from './GameObject'
import CardLib from './cards'


/**
 * 卡牌
 */
class Card extends GameObject {

   static 

  /**
   * @param {string} id 卡片id，对应cards/${id}.js
   * @param {Player} owner 属于
   */
  constructor(id,owner){
    this.cardID = id
    this.cardInfo = Object.assign({},CardLib[id])
    this.owner = player
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