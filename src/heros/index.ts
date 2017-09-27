
import Player from '../Player'
import Base from './Base'
import Mage from './Mage'


export const map: any = {
  "Mage": Mage,
}

export default function getHero(player: Player, heroClassName: string = 'Mage'): Base {
  const T: any = map[heroClassName]
  return new T(player)
}