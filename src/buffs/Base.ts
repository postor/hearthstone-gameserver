import Player from '../Player'
import Trigger from '../triggers/Base'

export default class Base extends Trigger {
  player: Player
  type: string
  exclusive: boolean = false

  constructor(player: Player) {
    super(player.game)
    this.player = player
  }
}