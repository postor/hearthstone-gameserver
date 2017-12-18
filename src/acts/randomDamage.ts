
import Player from '../Player'
import { Notify } from '../notifys/Base'
import { NotifyEnum } from '../utils/NotifyEnum'
import TargetTypeEnum from '../utils/TargetTypeEnum'
import { getTargetArray } from '../utils/getTargetArray'
import playerDamage from './playerDamage'
import servantDamage from './servantDamage'


export default function (player: Player, damage: number, targetArea: TargetTypeEnum) {
  const targets = getTargetArray(player, targetArea)
  const rand: any = targets[Math.floor(Math.random() * targets.length)];

  if (rand.isPlayer) {
    playerDamage(rand, damage, 'randomDamage')
  } else {
    servantDamage(rand, damage, 'randomDamage')
  }
}