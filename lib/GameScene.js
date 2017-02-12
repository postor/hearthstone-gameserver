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
    this.id = ''
    this.eventQueue = []
    this.eventLog = []
    this.players = []
    this.state = States.raw
    this.firstPlayer = null

    //--- 事件 ---
    this.on('init',(playerDatas)=>{
      this.id = uuidV4()
      this.players = getInitalPlayers(playerDatas)  
      this.startGame()
    })
  }

  getInitalPlayers(playerDatas){
    var rtn = []
    if(playerDatas){
      rtn = playerDatas.map((data)=>new Player(data))
    }else{
      rtn = [Player.getDefault(),Player.getDefault()] 
    }
    rtn[0].setEnemy(rtn[1])
    rtn[1].setEnemy(rtn[0])
    if(Math.random()>0.5){
      this.firstPlayer = rtn[0]      
    }else{
      this.firstPlayer = rtn[1]
    }

    this.firstPlayer.init
     
  }

}

module.exports = GameScene