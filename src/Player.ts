import Hero from './heros/Base'
import Game from './Game'
import Card from './cards/Base'
import Servant from './servants/Base'

export default class Player {
  health: number
  hero: Hero
  game: Game
  store: Card[]
  hand: Card[]
  field: Servant

  constructor(hero: Hero, store: Card[]) {
    this.hero = hero || 
  }
}