
import Player from '../Player'
import Base from './Base'
import CardFromData from '../utils/CardFromData'

import Coin from './Coin'
import BabblingBook from './BabblingBook'
import QuestingAdventurer from './QuestingAdventurer'



export const map: any = {
  Coin,
  BabblingBook,
  QuestingAdventurer,
}

export default function getCard(player: Player, cardClassName: string = 'BabblingBook', from: CardFromData = new CardFromData()): Base {
  const T: any = map[cardClassName]
  return new T(player, from)
}