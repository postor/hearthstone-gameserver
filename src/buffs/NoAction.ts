import Player from '../Player'
import Base from './Base'

export default class NoAction extends Base {
  player: Player

  constructor(player: Player) {
    super(player)
    this.type = 'NoAction'
  }
}