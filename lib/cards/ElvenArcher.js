export default {
  "name":"Elven Archer",
  "type":"Minions",
  "desc":"Battlecry: Deal 1 damage.",
  "sets":["Basic","Classic"],
  "class":"Neutral",
  "quality":"normal",
  "attark":1,
  "hp":1,
  "cost":1,
  "charge":false,
  "taunt":false,
  "onBattleCry":{
    "chooseOne":"TargetType.Any",
    "script":"target.onDamage(1)"
  }
}