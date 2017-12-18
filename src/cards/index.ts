
import Player from '../Player'
import { Card } from './Base'
import CardFromData from '../utils/CardFromData'

import { Coin } from './Coin'
import { ArcaneExplosion } from './ArcaneExplosion'
import { BloodmageThalnos } from './BloodmageThalnos'
import { ArcaneIntellect } from './ArcaneIntellect'
import { ArcaneMissiles } from './ArcaneMissiles'
import { FireBall } from './FireBall'
import { FrostBolt } from './FrostBolt'
import { FrostNova } from './FrostNova'
import { MirrorImage } from './MirrorImage'
import { Polymorph } from './Polymorph'



export const map: any = {
  Coin,
  ArcaneMissiles,
  ArcaneExplosion,
  BloodmageThalnos,
  ArcaneIntellect,
  FireBall,
  FrostBolt,
  FrostNova,
  MirrorImage,
  Polymorph
}

export default function getCard(player: Player, cardClassName: string = 'BabblingBook', from: CardFromData = new CardFromData()): Card {
  const T: any = map[cardClassName]
  return new T(player, from)
}