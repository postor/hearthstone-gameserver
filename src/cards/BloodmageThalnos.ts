import Base from './Base'
import Player from '../Player'
import CardFromData from '../utils/CardFromData'

export default class BloodmageThalnos extends Base {
  title:string = 'BloodmageThalnos'
  
  constructor(player: Player, from: CardFromData) {
    super(player, from)
  }

    
}