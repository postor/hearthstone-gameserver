import Game from '../Game'
import Notify from '../notifys/Base'
import NotifyEnum from '../utils/NotifyEnum'

import beforeTurn from './beforeTurn'

export default function (game: Game) {

  game.emit(
    'notify',
    new Notify(
      `end turn ${game.turn + 1}`,
      NotifyEnum.turnEnd,
    ).toObject()
  )

  //emit turn end

  //next turn
  game.todoQueue.push(() => {
    game.turn++
    game.currentPlayer = game.currentPlayer.getEnemy()

    game.todoQueue.push(() => {
      beforeTurn(game)
    })
  })
}