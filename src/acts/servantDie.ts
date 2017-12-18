import Servant from '../servants/Base'

import { Notify } from '../notifys/Base'
import { NotifyEnum } from '../utils/NotifyEnum'

export default (servant: Servant) => {
  const { player, game } = servant
  player.fieldServants = player.fieldServants.filter((x) => {
    return x.id != servant.id
  })

  game.emit(
    'notify',
    new Notify(
      `servant:${servant.title} die`,
      NotifyEnum.servantDie,
      servant.id,
    )
  )
}