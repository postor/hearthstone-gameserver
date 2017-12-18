import { Minion } from './Base'
import Player from '../Player'
import CardFromData from '../utils/CardFromData'
import TargetTypeEnum from '../utils/TargetTypeEnum'
import randomDamage from '../acts/randomDamage'

export class MirrorImage extends Minion {
  title = 'MirrorImage'

  attark = 0
  health = 2
  isTaunt = true

  constructor(player: Player) {
    super(player)
  }
}