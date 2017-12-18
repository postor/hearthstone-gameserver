
import Servant from '../servants/Base'
import { Notify } from '../notifys/Base'
import { NotifyEnum } from '../utils/NotifyEnum'
import servantDie from './servantDie'


export default function (servant: Servant, frosted: boolean, cause: string) {

  if (servant.isFrosted == frosted) {
    return
  }

  //deal damage
  servant.isFrosted = frosted

  //notify
  servant.player.game.emit(
    'notify',
    new Notify(
      `servant:${servant.title} is ${frosted ? 'frosted' : 'not frosted'}`,
      NotifyEnum.servantFrosted,
      servant.id,
    )
  )
}