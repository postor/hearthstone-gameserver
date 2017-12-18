import { Minion } from './Minion'
import Player from '../Player'
import CardFromData from '../utils/CardFromData'

export default class BabblingBook extends Minion {
  title = 'BabblingBook'

  constructor(player: Player, from: CardFromData) {
    super(player, from)
  }


}