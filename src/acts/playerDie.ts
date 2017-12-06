import Player from '../Player'
import Notify from '../notifys/Base'
import NotifyEnum from '../utils/NotifyEnum'

export default (player: Player) => {
  player.game.emit(
    'notify',
    new Notify(
      `player${player.id} die and player${player.getEnemy().id} win!`,
      NotifyEnum.playerDie,
    )
  )
}