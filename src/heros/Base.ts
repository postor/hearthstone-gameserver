import Trigger from '../triggers/Base'
import Player from '../Player'
import Skill from '../skills/Base'

export default class Base extends Trigger {
  resource: string
  player: Player
  skill: Skill

  constructor(player: Player) {
    super(player.game)
    this.player = player
  }
}