import Player from '../Player'
import Buff from '../buffs/Base'
import getBuff from '../buffs'
import Notify from '../notifys/Base'
import NotifyEnum from '../utils/NotifyEnum'

export default function (player: Player, name:string) {
  const buff = getBuff(name,player)
  player.buffs.push(buff)
}