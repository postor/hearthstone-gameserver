import GameScene from '../index'

var game = new GameScene()
game.startGame()
.then((gameResult)=>{
  console.log(['game over!',gameResult])
})
.catch((err)=>{
  console.log(['error!',console.log(err)])
})