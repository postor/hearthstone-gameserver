import Player from '../Player'
import CardFromData from '../utils/CardFromData'
import Trigger from '../triggers/Base'

export default class CardBase extends Trigger {
  static key: string
  
  title: string
  player: Player
  from: CardFromData

  constructor(player: Player, from: CardFromData) {
    super(player.game)
    this.player = player
    this.from = from
  }

  checkUse(){
    
  }

  onUse(){
    
  }
}