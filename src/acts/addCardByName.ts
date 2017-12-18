import Player from '../Player'
import CardFromData from '../utils/CardFromData'
import getCard from '../cards'
import addCard from './addCard'
import { NotifyEnum } from '../utils/NotifyEnum';

export default function (player: Player, cardClassName: string, from: CardFromData) {
  const card = getCard(player, cardClassName, from)
  return addCard(player, card, NotifyEnum.addCardToHand)
}