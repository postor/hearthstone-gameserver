import { Magic } from './Magic'
import Player from '../Player'
import CardFromData from '../utils/CardFromData'
import TargetTypeEnum from '../utils/TargetTypeEnum'
import playerDamage from '../acts/playerDamage'
import servantDamage from '../acts/servantDamage'
import playerFrost from '../acts/playerFrost'
import servantFrost from '../acts/servantFrost'

export class FrostBolt extends Magic {
  title: string = 'FrostBolt'
  cost = 2

  constructor(player: Player, from: CardFromData) {
    super(player, from)
  }

  onUse(target: any) {
    if (target.isPlayer) {
      this.game.todoQueue.push(() => {
        const damage = this.player.fieldServants.reduce((p, n) => p + n.magicDamageAdd, 3)
        playerDamage(target, damage, 'FrostBolt')
      })
      this.game.todoQueue.push(() => {
        playerFrost(target, true, 'FrostBolt')
      })
    } else {
      this.game.todoQueue.push(() => {
        const damage = this.player.fieldServants.reduce((p, n) => p + n.magicDamageAdd, 3)
        servantDamage(target, damage, 'FrostBolt')
      })
      this.game.todoQueue.push(() => {
        servantFrost(target, true, 'FrostBolt')
      })
    }
  }
}