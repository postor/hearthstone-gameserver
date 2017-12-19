import Trigger from '../triggers/Base'
import Player from '../Player'
import { Power } from './powers/Base'
import Buff from '../buffs/Base'

export default class Base extends Trigger {
  resource: string
  player: Player
  power: Power
  buffs: Buff[]

  constructor(player: Player) {
    super(player.game)
    this.player = player
  }
}