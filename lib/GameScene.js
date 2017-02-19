import uuidV4 from 'uuid/v4'
import Player from './Player'
import EventEmitter from 'events'
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
  
  constructor(){
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
    this.players = this.getInitalPlayers(playerDatas)
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
     * 开始游戏
     */
    this.startGame()

    /**
     * 接受queue事件，事件类型见EventTypes
     * @listens queue
     * @see module:EventTypes
     */
    this.on('queue',(obj)=>{
      this.eventQueue.push(obj)
    })
  }

  getInitalPlayers(playerDatas){
    var rtn = []
    //绑定额外信息
    if(playerDatas){
      rtn = playerDatas.map((data)=>new Player(data))
    }else{
      rtn = [Player.getDefault(),Player.getDefault()] 
    }

    //设置为敌人
    rtn[0].setEnemy(rtn[1])
    rtn[1].setEnemy(rtn[0])

    //player的事件统一到队列处理
    rtn.forEach((x)=>{
      this.eventQueue.push( Object.assign(obj,{
        player: x
      }))
    })

    //确定先后
    if(Math.random()>0.5){
      this.firstPlayer = rtn[0]      
    }else{
      this.firstPlayer = rtn[1]
    }

    //触发摸初始牌

    //等待替换
  }

  startGame(){

  }

}

export default GameScene