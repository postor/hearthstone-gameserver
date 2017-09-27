import Base from './Base'
import Player from '../Player'
import CardFromData from '../utils/CardFromData'

export default class Coin extends Base {
  static key: string = 'Coin'

  constructor(player: Player, from: CardFromData) {
    super(player, from)
    this.title = '法力水晶'
  }
}