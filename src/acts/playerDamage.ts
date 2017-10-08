
import Player from '../Player'
import Notify from '../notifys/Base'
import NotifyEnum from '../utils/NotifyEnum'


export default function (player: Player, damage: number, cause: string) {
  //在这里可以避免伤害，比如冰箱奥秘 

  //处理伤害
  player.health -= damage

  //通知
  player.game.emit(
    'notify',
    new Notify(
      `player${player.id} damaged ${damage} health(current:${player.health}) because ${cause}`,
      NotifyEnum.playerDamage,
    )
  )


  //判定死亡，游戏结束
  if (player.health <= 0) {
    player.game.emit(
      'notify',
      new Notify(
        `player${player.id} die and player${player.getEnemy().id} win!`,
        NotifyEnum.playerDie,
      )
    )
    process.exit()
  }
}