import Player from '../Player'
import { Card } from '../cards/Base'
import Trigger from '../triggers/Base'
import Buff from '../buffs/Base'

export class Minion extends Trigger {
  id: number
  isServant = true
  type: string
  title: string = 'Error'
  player: Player
  buffs: Buff[]
  isFrosted = false
  const: number
  attark: number = 1
  health: number = 1
  isTaunt: boolean
  magicDamageAdd: number
  hasBattleCry = false
  hasDeathRattle = false

  constructor(player: Player) {
    super(player.game)
    this.player = player
    this.id = player.game.newID()
  }

  battleCry() {

  }

  deathRattle() {

  }

  toObject() {
    return {
      type: this.type,
      title: this.title,
      player: this.player.id,
    }
  }
}