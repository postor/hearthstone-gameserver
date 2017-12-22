import { Game } from '../Game'

const game = new Game()
game.addListener('notify', (data) => {
  console.log(`${data.type}|${data.message}`)
  process.send(data)
})

game.start().then(() => {
  game.clean()
}).catch((e) => {
  process.send({ error: e, })
})