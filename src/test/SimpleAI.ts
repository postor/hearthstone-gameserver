import { Game } from "../Game";
import { Notify } from "../notifys/Base";
import { NotifyEnum } from '../utils/NotifyEnum'
import { UserActionEnum } from '../utils/UserActionEnum'
import Player from '../Player'

export class SimpleAI {
  listener: any

  constructor(private game: Game, private playerID: number) {
    this.listener = (data: Notify) => {
      switch (data.type) {
        case NotifyEnum.firstTurnPlayer:
          this.f0_exchangeCard()
          break;
        case NotifyEnum.turnUser:
          if (data.userId == this.playerID) {
            this.f1_turnActions()
          }
          break
      }
    }
    game.addListener('notify', this.listener)
  }

  unregist() {
    this.game.removeListener('notify', this.listener)
  }

  getPlayer() {
    return this.game.players[this.playerID]
  }

  f0_exchangeCard() {
    const cardIndexes = this.getPlayer().handCards.map((x, i) => i).filter(() => Math.random() < 0.5)
    const eventType = `player_${this.playerID}:${UserActionEnum.ChangeCards}`
    this.game.emit(
      eventType,
      {
        cardIndexes,
      }
    )
  }

  f1_turnActions() {
    const player = this.getPlayer()
    console.log(`player${this.playerID}'s coin is ${player.coin}`)
    if (player.coin >= 2) {
      const eventType = `player_${this.playerID}:${UserActionEnum.HeroSkill}`
      this.game.emit(
        eventType,
        {
          target: {
            player: player.getEnemy().id
          }
        }
      )
    }
    setTimeout(() => {
      const eventType = `player_${this.playerID}:${UserActionEnum.EndTurn}`
      this.game.emit(eventType)
    },10)
  }
}
