/**
 * @enum
 */
const EventTypes = {

  INIT_CARDS_RESULT: '初始卡片和对方英雄',
  INIT_CARDS_REPLACE: '（接受）需要替换的卡片',
  INIT_CARDS_REPLACE_RESULT: '替换卡片的结果',
  INIT_CARDS_COIN: '后手补偿水晶卡',

  BATTLE_BEGIN: '战役开始',
  TURN_BEGIN: '回合开始',
  TURN_END: '回合结束',

  USE_CARD: '使用一张卡牌（复合）',
  USE_CARD_BEGIN: '使用一张卡牌前触发',
  USE_CARD_DURING: '使用一张卡牌中',
  USE_CARD_END: '使用一张卡牌后触发',

  DRAW_CARD: '抽一张卡片（复合）',
  DRAW_CARD_BEGIN: '抽卡之前触发',
  DRAW_CARD_DURING: '抽卡中',
  DRAW_CARD_END: '抽卡之后',

  ATTARK: '攻击（复合）',
  ATTARK_BEGIN: '攻击前',
  ATTARK_DURING: '攻击进行中',
  ATTARK_END: '攻击后',

  MINION_DIE: '死亡(复合)',
  MINION_DIE_BEGIN: '死亡前触发',
  MINION_DIE_DURING: '死亡处理',
  MINION_DIE_END: '死亡之后',

  MINION_ADD: '随从召唤',

  DAMAGE : '受伤（复合）',
  DAMAGE_BEFORE: '受伤前',
  DAMAGE_DURING: '受伤中',
  DAMAGE_AFTER: '受伤后'
}

export default EventTypes