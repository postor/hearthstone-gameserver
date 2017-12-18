
import Servant from '../servants/Base'
import { Notify } from '../notifys/Base'
import { NotifyEnum } from '../utils/NotifyEnum'
import servantDie from './servantDie'


export default function (servant: Servant, damage: number, cause: string) {
  //prevent damage if you got secret

  //deal damage
  servant.health -= damage

  //notify
  servant.player.game.emit(
    'notify',
    new Notify(
      `servant:${servant.title} damaged ${damage} health(current:${servant.health}) because ${cause}`,
      NotifyEnum.servantDamage,
      servant.id,
    )
  )

  //die
  if (servant.health <= 0) {
    servant.game.todoQueue.unshift(() => {
      servantDie(servant)
    })
  }
}