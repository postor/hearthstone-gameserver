import Player from '../Player'
import changeCard from './changeCard'
import playerTired from './playerTired'
import addCard from './addCard'
import UserActionEnums from '../utils/UserActionEnum'
import shuffle from '../utils/shuffle'
import Notify from '../notifys/Base'
import NotifyEnum from '../utils/NotifyEnum'

export default function (player: Player) {
  //check empty
  if (!player.storeCards.length) {
    player.game.todoQueue.unshift(() => {
      playerTired(player)
    })
    return
  }

  //draw
  const card = player.storeCards.shift()

  //check full
  if (player.handCards.length >= 10) {
    player.game.emit(
      'notify',
      new Notify(
        `card ${card.title} destoried forHand full`,
        NotifyEnum.cardDestoriedForHandFull,
        card
      ).toObject()
    )
    return
  }

  //check buffs like copy or modify


  //add to hand
  player.game.todoQueue.unshift(() => {
    addCard(player, card)
  })

}