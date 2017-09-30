
/**
 * 初始抽牌数量：3
 */
const initDrawCardCount = 3

/**
 * 初始牌交换等待时间：30秒
 */
const initCardChangeTimeout = 30000


/**
 * 初始牌交换等待时间：30秒
 */
const playerTurnTimeout = 30000


/**
 * 玩家回合倒计时：15秒
 */
const playerTurnCountingTimeout = 30000

/**
 * 上回合没有操作的，直接15秒
 */
const playerTurnCountingNoActionTimeout = 15000

/**
 * 手牌上限：10张
 */
const playerHandCardCountMax = 10


export default {
  initDrawCardCount,
  initCardChangeTimeout,
  playerHandCardCountMax,
  playerTurnTimeout,
  playerTurnCountingTimeout,
  playerTurnCountingNoActionTimeout,
}