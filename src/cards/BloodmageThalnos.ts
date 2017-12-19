import { Minion } from './Minion'
import Player from '../Player'
import CardFromData from '../utils/CardFromData'

export class BloodmageThalnos extends Minion {
  title = 'BloodmageThalnos'
  cost = 2

  constructor(player: Player, from: CardFromData) {
    super(player, from)
  }
}