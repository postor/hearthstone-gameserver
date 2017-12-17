import { Game } from '../Game'

const game = new Game()
game.addListener('notify', (data) => {
  console.log(`${data.type}|${data.message}`)
})
game.start().then(()=>{
  console.log('exit!')
}).catch((e)=>{
  console.log(e)
})