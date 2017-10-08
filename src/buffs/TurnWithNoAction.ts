import Player from '../Player'
import Base from './Base'

export default class TurnWithNoAction extends Base {
  player: Player

  constructor(player: Player) {
    super(player)
    this.type = 'TurnWithNoAction'
  }
}