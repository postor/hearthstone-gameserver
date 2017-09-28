type TriggerEnum =
  /**
   * 回合结束
   * 
   * @type {string}
   * @memberof TriggerEnum
   */
  'TurnEnd'

  /**
   * 回合开始
   * 
   * @type {string}
   * @memberof TriggerEnum
   */
  | 'TurnBegin'

  /**
   * 使用卡牌（例如法术反制）
   * 
   * @type {string}
   * @memberof TriggerEnum
   */
  | 'UseCard'

  /**
   * 召唤随从（例如夜色镇执法官）
   * 
   * @type {string}
   * @memberof TriggerEnum
   */
  | 'NewServant'

  /**
   * 有角色受到伤害
   * 
   * @type {string}
   * @memberof TriggerEnum
   */
  | 'Harm'

  /**
   * 杀死
   * 
   * @type {string}
   * @memberof TriggerEnum
   */
  | 'Kill'

  /**
   * 抽牌
   * 
   * @type {string}
   * @memberof TriggerEnum
   */
  | 'DrawCard'

  /**
   * 攻击前
   * 
   * @type {string}
   * @memberof TriggerEnum
   */
  | 'BeforeAttark'

export default TriggerEnum

/**
* 获取所有的
* 
* @returns {string[]} 
* @memberof TriggerEnum
*/
export function getArray() {
  return [
    'BeforeAttark',
    'DrawCard',
    'Harm',
    'Kill',
    'NewServant',
    'TurnBegin',
    'TurnEnd',
    'UseCard',
  ]
}