import Game from '../Game'
import endTurn from './endTurn'
import beforeTurn from './beforeTurn'

export default function(game:Game){
  if(game.turn!=0){
    game.todoQueue.push(()=>{
      endTurn(game)
    })
  }
  game.turn++  
  game.todoQueue.push(()=>{
    beforeTurn(game)
  })
}