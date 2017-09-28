import Player from '../Player'
import Card from '../cards/Base'
import Trigger from '../triggers/Base'
import Buff from '../buffs/Base'

export default class Base extends Trigger {
  type: string
  title: string
  player: Player
  buffs: Buff[]

  constructor(player: Player) {
    super(player.game)
    this.player = player
  }

  toObject() {
    return {
      type: this.type,
      title: this.title,
      player: this.player.id,
    }
  }
}