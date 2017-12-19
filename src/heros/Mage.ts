import Player from "../Player";
import { Mage as MagePower } from "./powers/Mage";

export default class Mage {
  power: MagePower
  constructor(private player: Player) {
    this.power = new MagePower(player)
  }

}