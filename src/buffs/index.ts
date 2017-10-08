import Tired from './Tired'
import TurnWithNoAction from './TurnWithNoAction'
import Player from '../Player'
import BuffTypeEnum from '../utils/BuffTypeEnum'

export const BuffEnum = BuffTypeEnum

export const map: any = {
  TurnWithNoAction,
  Tired,
}

export default function getBuff(name: string, player: Player) {
  const Buff = map[name]
  return new Buff(player)
}