import Player from '../Player'
import changeCard from './changeCard'
import UserActionEnums from '../utils/UserActionEnum'
import shuffle from '../utils/shuffle'
import CardFromData from '../utils/CardFromData'
import getCard from '../cards'
import addCard from './addCard'

export default function (player: Player, cardClassName: string, from: CardFromData) {
  const card = getCard(player, cardClassName, from)
  return addCard(player, card)
}