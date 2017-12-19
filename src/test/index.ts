import { Game } from '../Game'
import { SimpleAI } from './SimpleAI'
import { getArr } from '../utils/cancleableWait'

const game = new Game()
game.addListener('notify', (data) => {
  console.log(`${data.type}|${data.message}`)
})

const aiPlayer0 = new SimpleAI(game, 0)
const aiPlayer1 = new SimpleAI(game, 1)

game.start().then(() => {
  aiPlayer0.unregist()
  aiPlayer1.unregist()
  game.removeAllListeners()
  console.log('exit!')
  console.log(getArr())
}).catch((e) => {
  console.log(e)
})