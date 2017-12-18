import { Minion } from './Base'
import Player from '../Player'

export class BloodfenRaptor extends Minion {
  title = 'BloodfenRaptor'

  attark = 3
  health = 2

  constructor(player: Player) {
    super(player)
  }
}