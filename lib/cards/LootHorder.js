export default {
  "name":"Loot Horder",
  "type":"Minions",
  "desc":"Deathrattle: Draw a card.",
  "sets":["Basic","Classic"],
  "class":"Neutral",
  "quality":"normal",
  "attark":2,
  "hp":1,
  "cost":1,
  "charge":false,
  "taunt":false,
  "onDeathrattle":"this.player.drawCard(1)"
}