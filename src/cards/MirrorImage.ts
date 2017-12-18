import { Magic } from './Magic'
import Player from '../Player'
import CardFromData from '../utils/CardFromData'
import TargetTypeEnum from '../utils/TargetTypeEnum'
import addServant from '../acts/addServant'
import { MirrorImage as MirrorImageServant } from '../minions/MirrorImage'

export class MirrorImage extends Magic {
  title: string = 'MirrorImage'

  constructor(player: Player, from: CardFromData) {
    super(player, from)
  }

  onUse() {
    for (let i = 0; i < 2; i++) {
      this.game.todoQueue.push(() => {
        addServant(this.player, new MirrorImageServant(this.player))
      })
    }
  }
}