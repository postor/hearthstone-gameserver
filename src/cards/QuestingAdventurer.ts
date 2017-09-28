import Base from './Base'
import Player from '../Player'
import CardFromData from '../utils/CardFromData'

export default class QuestingAdventurer extends Base {
  title:string = 'QuestingAdventurer'
  
  constructor(player: Player, from: CardFromData) {
    super(player, from)
  }

    
}