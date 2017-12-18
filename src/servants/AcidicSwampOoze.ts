import Base from './Base'
import Player from '../Player'
import CardFromData from '../utils/CardFromData'
import TargetTypeEnum from '../utils/TargetTypeEnum'
import drawCard from '../acts/drawCard'

export class NoviceEngineer extends Base {
  title = 'NoviceEngineer'

  attark = 3
  health = 2

  constructor(player: Player) {
    super(player)
  }

  battleCry() {
    drawCard(this.player)
  }
}