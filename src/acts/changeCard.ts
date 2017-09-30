import Player from '../Player'
import Notify from '../notifys/Base'
import NotifyEnum from '../utils/NotifyEnum'

export default function (player: Player, cardIndex: number) {
  if(!player.storeCards.length){
    console.log('no card to change')
    return
  }
  const storeIndex = Math.floor(Math.random()*player.storeCards.length)
  let tmpCard = player.storeCards[storeIndex]
  player.storeCards[storeIndex] = player.handCards[cardIndex]
  player.handCards[cardIndex] = tmpCard

  
  player.game.emit(
    'notify',
    new Notify(
      `init card exchanged end`,
      NotifyEnum.initCardExchangeEnd,
    ).toObject()
  )
}