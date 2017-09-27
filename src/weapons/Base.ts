import Player from '../Player'
import Trigger from '../triggers/Base'

export default class Base extends Trigger {
  static key: string
  player: Player

  constructor(player: Player) {
    super(player.game)
    this.player = player
  }
}