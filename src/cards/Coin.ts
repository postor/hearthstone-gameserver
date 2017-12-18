import { Magic } from './Magic'
import Player from '../Player'
import CardFromData from '../utils/CardFromData'
import addPlayerCoin from '../acts/addPlayerCoin'

export class Coin extends Magic {
  title: string = 'Coin'

  constructor(player: Player, from: CardFromData) {
    super(player, from)
  }

  onUse() {
    addPlayerCoin(this.player, 1)
  }
}