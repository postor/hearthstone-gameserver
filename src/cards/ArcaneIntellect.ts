import { Magic } from './Magic'
import Player from '../Player'
import CardFromData from '../utils/CardFromData'
import drawCard from '../acts/drawCard'

export class ArcaneIntellect extends Magic {
  title: string = 'ArcaneIntellect'
  cost = 3

  constructor(player: Player, from: CardFromData) {
    super(player, from)
  }

  onUse() {
    for (let i = 0; i++; i < 2) {
      this.player.game.todoQueue.push(() => {
        drawCard(this.player)
      })
    }
  }
}