
import Player from '../Player'
import { Notify } from '../notifys/Base'
import { NotifyEnum } from '../utils/NotifyEnum'
import TargetTypeEnum from '../utils/TargetTypeEnum'
import getTargetArray from '../utils/getTargetArray'
import playerDamage from './playerDamage'
import servantDamage from './servantDamage'


export default function (player: Player, damage: number, targetArea: TargetTypeEnum) {
  const targets = getTargetArray(player, targetArea)

  targets.forEach((rand: any) => {
    if (rand.isPlayer) {
      player.game.todoQueue.push(() => {
        playerDamage(rand, damage, 'randomDamage')
      })
    } else {
      player.game.todoQueue.push(() => {
        servantDamage(rand, damage, 'randomDamage')
      })
    }
  })


}