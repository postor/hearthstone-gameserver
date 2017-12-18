import { Magic } from './Magic'
import Player from '../Player'
import CardFromData from '../utils/CardFromData'
import TargetTypeEnum from '../utils/TargetTypeEnum'
import playerDamage from '../acts/playerDamage'
import servantDamage from '../acts/servantDamage'
import playerFrost from '../acts/playerFrost'
import servantFrost from '../acts/servantFrost'

export class FireBall extends Magic {
  title: string = 'FireBall'

  constructor(player: Player, from: CardFromData) {
    super(player, from)
  }

  onUse(target: any) {
    if (target.isPlayer) {
      this.game.todoQueue.push(() => {
        const damage = this.player.fieldServants.reduce((p, n) => p + n.magicDamageAdd, 6)
        playerDamage(target, damage, 'FireBall')
      })
    } else {
      this.game.todoQueue.push(() => {
        const damage = this.player.fieldServants.reduce((p, n) => p + n.magicDamageAdd, 6)
        servantDamage(target, damage, 'FireBall')
      })
    }
  }
}