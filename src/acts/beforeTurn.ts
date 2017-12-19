import { Game } from '../Game'
import { Notify } from '../notifys/Base'
import { NotifyEnum } from '../utils/NotifyEnum'
import userTurn from './userTurn'

export default function (game: Game) {
  const player = game.currentPlayer
  if (player.coinMax < 10) {
    player.coinMax++
  }
  player.coin = player.coinMax
  game.emit(
    'notify',
    new Notify(
      `before turn ${game.turn}`,
      NotifyEnum.turnBefore,
      player.id,
      {
        coin: player.coin,
        coinMax: player.coinMax
      }
    ).toObject()
  )

  //triggers before turn


  game.todoQueue.push(() => {
    userTurn(game)
  })
}