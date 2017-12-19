import { Magic } from './Magic'
import Player from '../Player'
import CardFromData from '../utils/CardFromData'
import TargetTypeEnum from '../utils/TargetTypeEnum'
import randomDamage from '../acts/randomDamage'

export class ArcaneMissiles extends Magic {
  title: string = 'ArcaneMissiles'
  cost = 1

  constructor(player: Player, from: CardFromData) {
    super(player, from)
  }

  onUse() {
    const count = this.player.fieldServants.reduce((p, n) => p + n.magicDamageAdd, 3)
    for (let i = 0; i++; i < count) {
      this.player.game.todoQueue.push(() => {
        randomDamage(this.player, 1, TargetTypeEnum.AllEnemy)
      })
    }
  }
}