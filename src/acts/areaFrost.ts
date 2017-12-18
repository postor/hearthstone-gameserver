
import Player from '../Player'
import { Notify } from '../notifys/Base'
import { NotifyEnum } from '../utils/NotifyEnum'
import TargetTypeEnum from '../utils/TargetTypeEnum'
import { getTargetArray } from '../utils/getTargetArray'
import playerFrost from './playerFrost'
import servantFrost from './servantFrost'


export default function (player: Player, frost: boolean, targetArea: TargetTypeEnum) {
  const targets = getTargetArray(player, targetArea)

  targets.forEach((rand: any) => {
    if (rand.isPlayer) {
      player.game.todoQueue.push(() => {
        playerFrost(rand, frost, 'areaFrost')
      })
    } else {
      player.game.todoQueue.push(() => {
        servantFrost(rand, frost, 'areaFrost')
      })
    }
  })


}