import uuidV4 from 'uuid/v4'
import EventEmitter from 'events'
import Player from './Player'
import EventTypes from './EventTypes'
import TaskBase from './tasks/TaskBase'
/**
 * 状态
 */
const States = {
  raw: 0,
  gameStart: 1, //开始，决定次序
  chooseEnd: 2,//选择置换的牌
  turnStart: 3,//回合开始
  turnDuring: 4,//回合中
  turnEnd: 5,//回合结束
  gameEnd: 6,
}

/**
 * 事件
 */
const Actions = {
  chooseEnd: 1,
  turnEnd: 2
}


class GameScene extends EventEmitter {
  /**
   * 构造游戏
   * @param {Object[]=} playerDatas 玩家绑定信息
   */
  constructor(){
    super()
    //--- 默认值 ---
    /**
     * 编号
     */
    this.id = uuidV4()
    /**
     * 事件队列
     * @type {Array}
     */
    this.eventQueue = []
    /**
     * 事件日志
     * @type {Array}
     */
    this.eventLog = []
    /**
     * 玩家列表
     * @type {Player[]}
     */
    this.players = []
    /**
     * 游戏状态
     * @type {number}
     */
    this.state = States.raw

    /**
     * 先手玩家
     * @type {Player}
     */
    this.firstPlayer = null

    /**
     * 是否有在处理队列
     * @type {boolean}
     * @private
     */
    this.isQueueDealing = false

    /**
     * 用于处理异步的事情
     * @type {Promise=}
     */
    this.dealQueuePromise = null

    /**
     * 接受queue事件，事件类型见EventTypes
     * @listens queue
     * @see module:EventTypes
     */
    this.on('queue',(obj)=>{
      this.enqueueItem((obj))
    })
  }

  /**
   * 开始游戏
   * @param playerDatas
   */
  startGame(playerDatas){
    this._initPlay()
    return new Promise((resolve,reject)=>{
      this.once(EventTypes.gameEnd,(obj)=>{
        resolve(obj)
      })
      this.once('error',(err)=>{
        reject(err)
      })
    })
  }

  _initPlay(playerDatas){
    var players = []
    //绑定额外信息
    if(playerDatas){
      players = playerDatas.map((data)=>new Player(data))
    }else{
      players = [new Player(this),new Player(this)]
    }

    //设置为敌人
    players[0].setEnemyPlayer(players[1])
    players[1].setEnemyPlayer(players[0])

    //player的事件统一到队列处理
    players.forEach((x)=>{
      x.on('queue',(obj)=>{        
        this.enqueueItem(obj)
      })
    })
    this.players = players

    //确定先后
    if(Math.random()>0.5){
      this.firstPlayer = players[0]      
    }else{
      this.firstPlayer = players[1]
    }

    //触发摸初始牌
    this.firstPlayer.initChoose(true)
    this.firstPlayer.getEnemyPlayer().initChoose(false)

    //等待替换
    Promise.all(this.players.map((player)=>{
      return new Promise((resolve,reject)=>{
        console.log(`waiting for EventTypes.INIT_CARDS_RESULT on Player(isFirst:${player.isFirst})`)
        player.once(EventTypes.INIT_CARDS_RESULT,(obj)=>{
          //用户选择完要替换的卡牌了
          resolve()
        })
      })
    }))
    .then(()=>{
      this.firstPlayer.getEnemyPlayer().addCard2Hand('Coin')
      this.firstPlayer.startTurn()
    })
  }

  /**
   * 处理队列事件
   */
  dealQueue(){
    if(!this.eventQueue.length){
      this.isQueueDealing = false
      return
    }
    this.dealQueuePromise = this.dealQueueItem()
    this.dealQueuePromise.then(
      ()=>{
        //通过的情况需要不断的链接下去
        if(this.eventQueue.length){
          return this.dealQueueItem()
        }
      },
      (err)=>{
        //拒绝的情况就是没事可做了
        this.isQueueDealing = false
        this.dealQueuePromise = null
      }
    )
  }

  /**
   * 处理单个任务
   * @return {Promise}
   */
  dealQueueItem(){
    var task = this.dequeueItem()
    if(!task){
      this.isQueueDealing = false
      return Promise.reject('没有可做的事情！')
    }else{
      var rtn = this.dealTask(task)
      if(rtn){
        return rtn
      }else{
        return Promise.resolve()
      }
    }
  }

  //---setter/getters

  /**
   * 推入队列一个事件
   * @param {TaskBase} obj
   * @param {boolean=} posHead 是否放前面，默认放后面
   */
  enqueueItem(obj,posHead){
    if(posHead){
      this.eventQueue.push(obj)
    }else{
      this.eventQueue.unshift(obj)
    }
    if(!this.isQueueDealing){
      this.dealQueue()
    }
  }

  /**
   * 批量增加任务
   * @param {TaskBase[]} arr
   * @param {boolean=} posHead 是否放前面，默认放后面
   */
  enqueueItems(arr,posHead){
    if(posHead){
      this.eventQueue = this.eventQueue.concat(arr)
    }else{
      this.eventQueue = arr.concat(this.eventQueue)
    }
    if(!this.isQueueDealing){
      this.dealQueue()
    }
  }

  /**
   * 取出一个任务
   * @returns {Task}
   */
  dequeueItem(){
    if(this.eventQueue.length){
      return this.eventQueue.shift()
    }
  }

  /**
   * 处理一个任务
   */
  dealTask(task){
    console.log(task.constructor.name)
    if(task.handle){
      return task.handle()
    }
  }
}

export default GameScene