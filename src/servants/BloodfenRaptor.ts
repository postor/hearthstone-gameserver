import Base from './Base'
import Player from '../Player'

export class BloodfenRaptor extends Base {
  title = 'BloodfenRaptor'

  attark = 3
  health = 2

  constructor(player: Player) {
    super(player)
  }
}