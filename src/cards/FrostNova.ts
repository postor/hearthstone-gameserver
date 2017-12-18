import { Magic } from './Magic'
import Player from '../Player'
import CardFromData from '../utils/CardFromData'
import TargetTypeEnum from '../utils/TargetTypeEnum'
import areaFrost from '../acts/areaFrost'

export class FrostNova extends Magic {
  title: string = 'FrostNova'

  constructor(player: Player, from: CardFromData) {
    super(player, from)
  }

  onUse() {
    areaFrost(this.player, true, TargetTypeEnum.EnemyServant)
  }
}