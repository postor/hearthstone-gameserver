import Player from '../Player'
import { BuffEnum, default as getBuff } from '../buffs'
import Buff from '../buffs/Tired'

import playerDamage from './playerDamage'

export default function (player: Player) {
  let tiredBuffs = player.getBuffBytType(BuffEnum.Tired)
  let tiredBuff: Buff
  if (!tiredBuffs.length) {
    tiredBuff = getBuff(BuffEnum.Tired, player)
    player.buffs.push(tiredBuff)
  } else {
    tiredBuff = <Buff>tiredBuffs[0]
  }

  tiredBuff.addEmptyDrawCount()
  player.game.todoQueue.unshift(() => {
    playerDamage(player, tiredBuff.getEmpytDrawDamage(), 'draw card tired')
  })
}