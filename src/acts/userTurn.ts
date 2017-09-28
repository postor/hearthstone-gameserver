import Game from '../Game'
import Notify from '../notifys/Base'
import NotifyEnum from '../utils/NotifyEnum'

export default function (game: Game) {  
  game.emit(
    'notify',
    new Notify(
      `before turn ${game.turn}`,
      NotifyEnum.turnBefore,
    ).toObject()
  )

  
}