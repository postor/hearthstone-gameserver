import { Minion } from './Minion'
import Player from '../Player'
import CardFromData from '../utils/CardFromData'

export class BloodmageThalnos extends Minion {
  title = 'BloodmageThalnos'

  constructor(player: Player, from: CardFromData) {
    super(player, from)
  }
}