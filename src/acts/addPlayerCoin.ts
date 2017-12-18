import Player from "../Player";

import { Notify } from '../notifys/Base'
import { NotifyEnum } from '../utils/NotifyEnum'

const COIN_MAX = 10
export default (player: Player, count: number) => {
  player.coin += count
  if (player.coin > COIN_MAX) {
    player.coin = COIN_MAX
  }

  player.game.emit(
    'notify',
    new Notify(
      `player ${player.id} added coin`,
      NotifyEnum.playerAddCoin,
      player.id,
      {
        currentCoin: player.coin
      }
    ).toObject()
  )
}
