import Game from '../Game'
import UserActionEnums from '../utils/UserActionEnum'
import changeCard from './changeCard'

export default function (game: Game) {
  //shuffle first

  //pick first cards

  //wait
  let waiting = true
  Promise.race([new Promise((resolve, reject) => {
    setTimeout(() => {
      waiting = false
      resolve()
    }, 30000)
  }), Promise.all(game.players.map((player, i) => new Promise((resolve, reject) => {
    game.once(`player${i}:${UserActionEnums.ChangeCards}`, (data = {}) => {
      const cardIndexes: number[] = data.cardIndexes || []
      cardIndexes.forEach((x) => {
        game.todoQueue.push(() => {
          changeCard(game, game.players[i], x)
        })
      })
      resolve()
    })
  })))]).then(() => {
    game.tick()
  }).catch(console.log)
}