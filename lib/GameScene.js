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
     * @member {Array}
     */
    this.eventQueue = []
    /**
     * 事件日志
     * @member {Array}
     */
    this.eventLog = []
    /**
     * 玩家列表
     * @member {Player[]}
     */
    this.players = this.getInitalPlayers(playerDatas)
    /**
     * 游戏状态
     * @member {number}
     */
    this.state = States.raw

    /**
     * 先手玩家
     * @member {Player}
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

  /**
   * @private
   * 初始化玩家
   * @param {Array} playerDatas 玩家信息
   */
  getInitalPlayers(playerDatas){
    /**
     * @type {Player[]}
     */
    var rtn = []
    //确定先后

    //绑定额外信息
    if(playerDatas){
      if(playerDatas.length>2) this.emit('error','玩家不能多于2个')
      rtn = playerDatas.map((data,i)=>new Player(this,data))
    }

    if(rtn.length<2){
      for(var i=rtn.length;i<2;i++){
        rtn.push(new Player(this)) 
      }
    }

    //设置为敌人
    rtn[0].setEnemy(rtn[1])
    rtn[1].setEnemy(rtn[0])

    //确定先后顺序
    var isFirsts = [1,0]
    if(Math.random()>=0.5){
      isFirsts = [0,1]
    }
    //player的事件统一到队列处理
    rtn.forEach((x,index)=>{
      x.on('queue',(obj)=>{
        this.emit('queue',Object.assign(obj,{player:x}))
      })
      x.initChoose(isFirsts[index])
    })
  }

  startGame(){

  }

}

export default GameScene