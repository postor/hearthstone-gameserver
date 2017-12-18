import { Magic } from './Magic'
import Player from '../Player'
import CardFromData from '../utils/CardFromData'
import TargetTypeEnum from '../utils/TargetTypeEnum'
import playerDamage from '../acts/playerDamage'
import servantDamage from '../acts/servantDamage'
import playerFrost from '../acts/playerFrost'
import servantFrost from '../acts/servantFrost'
import Servant from '../servants/Base'
import { Sheep } from '../servants/Sheep'

export class Polymorph extends Magic {
  title = 'Polymorph'

  constructor(player: Player, from: CardFromData) {
    super(player, from)
  }

  onUse(target: any) {
    const tplayer: Player = target.player
    tplayer.fieldServants = tplayer.fieldServants.map((x) => {
      if (target.id === x.id) {
        return new Sheep(tplayer)
      }
      return x
    })
  }
}