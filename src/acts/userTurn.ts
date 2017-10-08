import Game from '../Game'
import Player from '../Player'
import config from '../config'
import Notify from '../notifys/Base'
import NotifyEnum from '../utils/NotifyEnum'
import BuffTypeEnum from '../utils/BuffTypeEnum'
import timeoutPromise from '../utils/timeoutPromise'
import UserActionEnum from '../utils/UserActionEnum'

import useCard from './useCard'
import heroSkill from './heroSkill'
import playerAttark from './playerAttark'
import endTurn from './endTurn'
import drawCard from './drawCard'
import addPlayerBuff from './addPlayerBuff'

export default function (game: Game) {
  const player = game.currentPlayer
  game.emit(
    'notify',
    new Notify(
      `player${player.id} turn ${game.turn}`,
      NotifyEnum.turnUser,
    )
  )

  //抽牌
  game.todoQueue.push(() => {
    drawCard(player)
  })


  //上一回合没有操作，则直接进入倒计时，否则等待15s后进入倒数
  let buffs = player.getBuffBytType(BuffTypeEnum.TurnWithNoAction)
  let toClean: any = []
  let turnIsDone = false

  const playerEndTurn = waitPlayerEndTurn(player)
  toClean.push(playerEndTurn.clean)
  console.log(`player${player.id} has buff TurnWithNoAction count:${buffs.length}`)
  if (buffs.length) {
    game.emit(
      'notify',
      new Notify(
        `[no action last turn]${config.playerTurnCountingNoActionTimeout}s counting! player${player.id} turn ${game.turn}`,
        NotifyEnum.noActionTimeOutCounting,
        config.playerTurnCountingNoActionTimeout
      )
    )

    const wait15 = waitPlayerAction(player, config.playerTurnCountingNoActionTimeout)
    toClean.push(wait15.clean)

    Promise.race([
      //15秒无使用卡牌、英雄技能、攻击动作则结束，否则30秒结束
      wait15.promise.then((userDidAction) => {
        if (userDidAction) {
          //用户确实做了操作，15秒限制取消
          /* @todo 非15秒情况不能用这样的代码，这里偷懒了           */
          game.emit(
            'notify',
            new Notify(
              `${config.playerTurnCountingTimeout}s counting! player${player.id} turn ${game.turn}`,
              NotifyEnum.timeOutCounting,
              config.playerTurnCountingTimeout
            )
          )
          return timeoutPromise(config.playerTurnCountingTimeout)
        }
        return false
      }),
      //用户结束回合
      playerEndTurn.promise
    ]).then(() => {
      cleanAndTurnEnd(toClean)
    })
  } else {
    //假设用户无操作，有操作会自动移除
    addPlayerBuff(player, BuffTypeEnum.TurnWithNoAction)
    const wait30 = waitPlayerAction(player, config.playerTurnTimeout)
    toClean.push(wait30.clean)
    let playerEnded = false
    Promise.race([
      //30秒结束
      wait30.promise,
      //15秒提示
      timeoutPromise(config.playerTurnTimeout - config.playerTurnCountingTimeout).then(() => {
        if (!playerEnded) {
          game.emit(
            'notify',
            new Notify(
              `${config.playerTurnCountingTimeout}s counting! player${player.id} turn ${game.turn}`,
              NotifyEnum.timeOutCounting,
              config.playerTurnCountingTimeout
            )
          )
        }
      }),
      //用户结束回合
      playerEndTurn.promise.then(() => {
        playerEnded = true
      })
    ]).then(() => {
      cleanAndTurnEnd(toClean)
    })
  }

  function cleanAndTurnEnd(arr: any[]) {
    arr.map((x) => x())
    game.todoQueue.push(() => {
      endTurn(game)
    })
  }
}

/**
 * 倒计时，但用户操作会resolve(true)
 * 
 * @param {Player} player 
 * @param {number} timeout
 */
function waitPlayerAction(player: Player, timeout: number) {
  let result = false
  const actions = {
    [UserActionEnum.UseCard]: (data: any) => game.todoQueue.push(() => {
      player.removeBuffByType(BuffTypeEnum.TurnWithNoAction)
      useCard(player, data)
    }),
    [UserActionEnum.HeroSkill]: (data: any) => game.todoQueue.push(() => {
      player.removeBuffByType(BuffTypeEnum.TurnWithNoAction)
      heroSkill(player, data)
    }),
    [UserActionEnum.PlayerAttark]: (data: any) => game.todoQueue.push(() => {
      player.removeBuffByType(BuffTypeEnum.TurnWithNoAction)
      playerAttark(player, data)
    }),
  }

  let toClean: any[] = []
  const game = player.game

  const promise = new Promise((resolve, reject) => {
    Object.keys(actions).forEach((actionKey) => {
      const listenner = (data: any) => {
        actions[actionKey](data)
        player.removeBuffByType(BuffTypeEnum.TurnWithNoAction)
      }
      const name = `player_${player.id}:${actionKey}`
      toClean.push({
        listenner,
        name,
      })
    })
    setTimeout(() => {
      resolve(result)
    }, timeout)
  })

  const clean = () => {
    toClean.forEach((x: any) => {
      game.removeListener(x.name, x.listenner)
    })
  }

  return {
    promise,
    clean,
  }
}

/**
 * 等待玩家点击`回合结束`
 * 
 * @param {Player} player 
 * @returns 
 */
function waitPlayerEndTurn(player: Player) {
  const game = player.game

  let listenner: any
  const name = `player_${player.id}:${UserActionEnum.EndTurn}`
  const promise = new Promise((resolve, reject) => {
    listenner = (data: any) => {
      player.removeBuffByType(BuffTypeEnum.TurnWithNoAction)
      resolve(true)
    }
    game.once(name, listenner)
  })

  const clean = () => {
    game.removeListener(name, listenner)
  }

  return {
    promise,
    clean
  }
}

