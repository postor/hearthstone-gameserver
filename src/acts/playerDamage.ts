
import Player from '../Player'
import { Notify } from '../notifys/Base'
import { NotifyEnum } from '../utils/NotifyEnum'
import playerDie from './playerDie'


export default function (player: Player, damage: number, cause: string) {
  //prevent damage if you got secret

  //deal damage
  player.health -= damage

  //notify
  player.game.emit(
    'notify',
    new Notify(
      `player${player.id} damaged ${damage} health(current:${player.health}) because ${cause}`,
      NotifyEnum.playerDamage,
      player.id,
    )
  )

  //die
  if (player.health <= 0) {
    player.game.todoQueue.unshift(() => {
      playerDie(player)
    })
  }
}