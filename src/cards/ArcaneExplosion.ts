import { Magic } from './Magic'
import Player from '../Player'
import CardFromData from '../utils/CardFromData'
import TargetTypeEnum from '../utils/TargetTypeEnum'
import randomDamage from '../acts/randomDamage'

export class ArcaneExplosion extends Magic {
  title: string = 'ArcaneExplosion'

  constructor(player: Player, from: CardFromData) {
    super(player, from)
  }

  onUse() {
    for (let i = 0; i++; i < 3) {
      this.player.game.todoQueue.push(() => {
        randomDamage(this.player, 1, TargetTypeEnum.AllEnemy)
      })
    }
  }
}