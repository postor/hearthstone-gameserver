import Player from '../Player'
import CardFromData from '../utils/CardFromData'
import Trigger from '../triggers/Base'
import Buff from '../buffs/Base'
import { Minion as Servant } from '../minions/Base'

export class Card extends Trigger {
  static key: string

  title: string
  player: Player
  from: CardFromData
  buffs: Buff[]
  servant: Servant

  needTarget: boolean = false
  needPosition: boolean = false

  constructor(player: Player, from: CardFromData) {
    super(player.game)
    this.player = player
    this.from = from
  }

  checkUse() {

  }

  onUse(target: string = undefined, position: number = undefined) {

  }

  toObject() {
    const servant = this.servant ? this.servant.toObject() : undefined
    return {
      player: this.player.id,
      from: this.from.toObject(),
      servant,
      title: this.title,
      cost: this.cost
    }
  }
}