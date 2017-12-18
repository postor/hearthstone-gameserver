import Player from '../Player'
import CardFromData from '../utils/CardFromData'
import { Card } from './Base'
import { Minion as Servant } from '../minions/Base'

export class Minion extends Card {
  isMinion = true
  needPosition = true
  minion: Servant
  constructor(player: Player, from: CardFromData) {
    super(player, from)
    this.minion = new Servant(player)
  }
}