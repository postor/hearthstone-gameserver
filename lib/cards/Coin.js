export default {
  "name":"Coin",
  "type":"Spell",
  "desc":"Gain 1 Mana Crystal this turn only.",
  "sets":["Basic","Classic"],
  "class":"Neutral",
  "quality":"normal",
  "cost":0,
  "onSpell":"this.player.addMana(1)"
}