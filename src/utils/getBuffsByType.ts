import BuffTypeEnum from './BuffTypeEnum'
import Player from '../Player'
import Buff from '../buffs/Base'

export default function getBuffsByType(type: string, player: Player) {
  let buffs: Buff[] = []

  return buffs
}

function getPlayerBuffsByType(type: string, player: Player) {

  let buffs: Buff[] = []
  buffs = buffs.concat(player.buffs.filter((x) => (x.type === type)))
  buffs = buffs.concat(player.hero.buffs.filter((x) => (x.type === type)))
  buffs = buffs.concat(player.weapon.buffs.filter((x) => (x.type === type)))
  player.fieldServants.forEach((servant) => {
    buffs = buffs.concat(servant.buffs.filter((x) => (x.type === type)))
  })

  return buffs
}