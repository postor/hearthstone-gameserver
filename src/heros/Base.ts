import Trigger from '../triggers/Base'
import Player from '../Player'
import Skill from '../skills/Base'
import Buff from '../buffs/Base'

export default class Base extends Trigger {
  resource: string
  player: Player
  skill: Skill
  buffs: Buff[]

  constructor(player: Player) {
    super(player.game)
    this.player = player
  }
}