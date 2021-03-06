import Player from '../Player'
import { Card } from '../cards/Base'
import { Notify } from '../notifys/Base'
import { NotifyEnum } from '../utils/NotifyEnum'

export default function (player: Player, card: Card, notifyType: string) {
  //check full
  if (player.handCards.length >= 10) {
    return
  }

  player.handCards.push(card)

  player.game.emit(
    'notify',
    new Notify(
      `card ${card.title} added to player${player.id}'s hand`,
      notifyType,
      player.id,
      card,
    ).toObject()
  )

}