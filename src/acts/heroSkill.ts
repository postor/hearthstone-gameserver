
import Player from '../Player'
import Notify from '../notifys/Base'
import NotifyEnum from '../utils/NotifyEnum'


export default function (player: Player, data: any) {
  player.game.emit(
    'notify',
    new Notify(
      `player${player.id} use hero skill: ${JSON.stringify(data)}`,
      NotifyEnum.playerUseSkill,
    )
  )
}