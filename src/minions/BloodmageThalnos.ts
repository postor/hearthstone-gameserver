import { Minion } from './Base'
import Player from '../Player'
import drawCard from '../acts/drawCard'

export class BloodmageThalnos extends Minion {
  title = 'BloodmageThalnos'

  attark = 1
  health = 1
  magicDamageAdd = 1

  constructor(player: Player) {
    super(player)
  }

  hasDeathRattle = true
  deathRattle() {
    this.game.todoQueue.push(() => {
      drawCard(this.player)
    })
  }
}