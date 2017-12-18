import { Magic } from './Magic'
import Player from '../Player'
import CardFromData from '../utils/CardFromData'
import TargetTypeEnum from '../utils/TargetTypeEnum'
import { getTargetArray } from '../utils/getTargetArray'
import servantDamage from '../acts/servantDamage'

export class ArcaneExplosion extends Magic {
  title: string = 'ArcaneExplosion'


  constructor(player: Player, from: CardFromData) {
    super(player, from)
  }

  onUse() {
    const targets = getTargetArray(this.player, TargetTypeEnum.EnemyServant)
    const damage = this.player.fieldServants.reduce((p, n) => p + n.magicDamageAdd, 1)
    targets.forEach((x: any) => {
      this.player.game.todoQueue.push(() => {
        servantDamage(x, 1, 'ArcaneExplosion')
      })
    })
  }
}