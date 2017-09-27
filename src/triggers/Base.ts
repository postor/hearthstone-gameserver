import Game from '../Game'
import { default as TriggerEnum, getArray as getTriggerEnumArray } from '../utils/TriggerEnum'
import {
  BeforeAttark, DrawCard, Harm, Kill,
  NewServant, TurnBegin, TurnEnd, UseCard,
} from './data'

export default class Base {
  game: Game
  [key: string]: any

  constructor(game: Game) {
    this.game = game

    getTriggerEnumArray().map((x) => {
      this.game.on(`trigger_${x}`, (data) => {
        const checkMethodName = `check${x}`, onMethodName = `on${x}`
        this[checkMethodName] && this[onMethodName] && this[checkMethodName](data) && this[onMethodName](data)
      })
    })
  }

  onBeforeAttark(data: BeforeAttark) { }
  onDrawCard(data: BeforeAttark) { }
  onHarm(data: Harm) { }
  onKill(data: Kill) { }
  onNewServant(data: NewServant) { }
  onTurnBegin(data: TurnBegin) { }
  onTurnEnd(data: TurnEnd) { }
  onUseCard(data: UseCard) { }

  checkBeforeAttark(data: BeforeAttark) { }
  checkDrawCard(data: BeforeAttark) { }
  checkHarm(data: Harm) { }
  checkKill(data: Kill) { }
  checkNewServant(data: NewServant) { }
  checkTurnBegin(data: TurnBegin) { }
  checkTurnEnd(data: TurnEnd) { }
  checkUseCard(data: UseCard) { }
}