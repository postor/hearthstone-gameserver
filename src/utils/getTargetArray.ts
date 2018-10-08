import Player from "../Player";
import TargetTypeEnum from "./TargetTypeEnum";

export const getTargetArray = (player: Player, targetType: TargetTypeEnum) => {
  let arr = []
  if (targetType & TargetTypeEnum.OurPlayer) {
    arr.push(player)
  }
  if (targetType & TargetTypeEnum.OurServant) {
    arr = [...arr, ...player.fieldServants]
  }
  const enemyPlayer = player.getEnemy()
  if (targetType & TargetTypeEnum.EnemyPlayer) {
    arr.push(enemyPlayer)
  }
  if (targetType & TargetTypeEnum.EnemyServant) {
    arr = [...arr, ...enemyPlayer.fieldServants]
  }
  return arr
}