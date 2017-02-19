export default {
  "name":"Southsea Deckhand",
  "type":"Minions",
  "desc":"Has Charge while you have a weapon equipped.",
  "sets":["Basic","Classic"],
  "class":"Neutral",
  "quality":"normal",
  "attark":2,
  "hp":1,
  "cost":1,
  "charge":false,
  "taunt":false,
  "onAny":"this.player.hasWeapon()?setCharge(true):setCharge(false)"
}