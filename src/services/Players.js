import players from './mock.json'

export default {
  get: () => new Promise(resolve => setTimeout(() => resolve(players), 1500)),
  get: () => players.map((player, playerIndex) => ({
    id: playerIndex,
    ...player,
  })),
}
