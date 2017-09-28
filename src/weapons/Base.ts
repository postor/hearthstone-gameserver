import Player from '../Player'
import Trigger from '../triggers/Base'
import Buff from '../buffs/Base'

export default class Base extends Trigger {
  static key: string
  player: Player
  buffs: Buff[]

  constructor(player: Player) {
    super(player.game)
    this.player = player
  }
}