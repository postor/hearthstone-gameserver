import { Game } from '../Game'
export const getTarget = (targetFormat: any, game: Game) => {
  const { player, servant } = targetFormat
  if (player !== undefined) {
    return game.players[player]
  }
  const servants = game.players.reduce((rtn, next) => {
    return rtn.concat(next.fieldServants)
  }, [])
  return servants.find((x) => (x.id === servant))
}