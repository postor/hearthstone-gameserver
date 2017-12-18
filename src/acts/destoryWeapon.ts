import Player from "../Player";
import { Notify } from '../notifys/Base'
import { NotifyEnum } from '../utils/NotifyEnum'

export default (player:Player)=>{
  if(player.weapon){
    player.weapon = undefined

    player.game.emit(
      'notify',
      new Notify(
        `player ${player.id} weapon destoried`,
        NotifyEnum.cardDestoriedForHandFull,
        player.id
      ).toObject()
    )
  }
}