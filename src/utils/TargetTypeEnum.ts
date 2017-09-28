
/**
 * 目标范围
 * 
 * @enum {number}
 */
enum TargetTypeEnum {
  All = 0b01111,
  AllOur = 0b00011,
  AllEnemy = 0b01100,
  AllPlayer = 0b00101,
  AllServant = 0b01010,
  OurPlayer = 0b00001,
  OurServant = 0b00010,
  EnemyPlayer = 0b00100,
  EnemyServant = 0b01000,
  None = 0b00000,
}

export default TargetTypeEnum