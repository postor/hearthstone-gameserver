import Base from './Base'
import Player from '../Player'
import CardFromData from '../utils/CardFromData'

export default class BabblingBook extends Base {
  static key: string = 'BabblingBook'

  
  constructor(player: Player, from: CardFromData) {
    super(player, from)
  }

    
}