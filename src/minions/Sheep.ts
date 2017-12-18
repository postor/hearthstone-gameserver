import { Minion } from './Base'
import Player from '../Player'
import CardFromData from '../utils/CardFromData'
import TargetTypeEnum from '../utils/TargetTypeEnum'
import randomDamage from '../acts/randomDamage'

export class Sheep extends Minion {
  title = 'Sheep'

  attark = 1
  health = 1

  constructor(player: Player) {
    super(player)
  }
}