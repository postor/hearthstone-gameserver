import Tired from './Tired'
import NoAction from './NoAction'
import Player from '../Player'

export const BuffEnum = {
  NoAction: 'NoAction',
  Tired: 'Tired',
}

export const map:any = {
  NoAction,
  Tired,
}

export default function getBuff(name:string,player:Player){
  const Buff = map[name]
  return new Buff(player)
}