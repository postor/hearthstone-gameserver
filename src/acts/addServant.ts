import Player from '../Player'
import { Minion as Servant } from '../minions/Base'
import { Notify } from '../notifys/Base'
import { NotifyEnum } from '../utils/NotifyEnum'

const MAX_SERVANT_COUNT = 7

export default function (player: Player, servant: Servant, position: number = -1) {
  //check full
  if (player.fieldServants.length >= 7) {
    return
  }
  const newPos = (position === -1) ? player.fieldServants.length : position
  player.fieldServants.splice(newPos, 0, servant)

  player.game.emit(
    'notify',
    new Notify(
      `servant ${servant.title} added to player${player.id}'s battlefield pos=${newPos}`,
      NotifyEnum.addServant,
      player.id,
      {
        position: newPos,
        servant,
      }
    ).toObject()
  )

}