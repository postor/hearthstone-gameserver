import { Power } from './Base'
import Player from '../../Player'
import Trigger from '../../triggers/Base'
import playerDamage from '../../acts/playerDamage'
import servantDamage from '../../acts/servantDamage'

export class Mage extends Power {
  cost = 2
  constructor(private player: Player) {
    super(player.game)
  }

  onUse(target: any) {
    console.log('MagePower')
    if (this.player.coin < 2) {
      return
    }
    this.player.coin -= 2
    if (target.isPlayer) {
      this.game.todoQueue.push(() => {
        playerDamage(target, 1, 'MagePower')
      })
    } else {
      this.game.todoQueue.push(() => {
        servantDamage(target, 1, 'MagePower')
      })
    }
  }
}