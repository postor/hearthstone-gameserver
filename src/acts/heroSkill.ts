
import Player from '../Player'
import { Notify } from '../notifys/Base'
import { NotifyEnum } from '../utils/NotifyEnum'
import { getTarget } from '../utils/getTarget'

export default function (player: Player, data: any) {

  const power = player.hero.power
  const target = getTarget(data.target, player.game)

  if (target) {
    power.onUse(target)
  }
}