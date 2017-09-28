import Base from './Base'
import Player from '../Player'
import CardFromData from '../utils/CardFromData'

export default class Coin extends Base {
  title:string = 'Coin'

  constructor(player: Player, from: CardFromData) {
    super(player, from)
  }
}