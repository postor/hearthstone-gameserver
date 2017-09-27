
import Player from '../Player'
import Base from './Base'
import Coin from './Coin'
import BabblingBook from './BabblingBook'
import CardFromData from '../utils/CardFromData'


export const map: any = {
  Coin,
  BabblingBook,
}

export default function getCard(player: Player, cardClassName: string = 'BabblingBook', from: CardFromData = new CardFromData()): Base {
  const T: any = map[cardClassName]
  return new T(player, from)
}