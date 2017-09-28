import Game from '../Game'

const game = new Game()
game.on('notify', (data) => {
  console.log("\n\r", JSON.stringify(data))
})