
import Player from '../Player'
import { Notify } from '../notifys/Base'
import { NotifyEnum } from '../utils/NotifyEnum'


export default function (player: Player, frosted: boolean, cause: string) {

  if (player.isFrosted == frosted) {
    return
  }
  //deal damage
  player.isFrosted = frosted

  //notify
  player.game.emit(
    'notify',
    new Notify(
      `player:${player.id} is ${frosted ? 'frosted' : 'not frosted'}`,
      NotifyEnum.playerFrosted,
      player.id,
    )
  )
}