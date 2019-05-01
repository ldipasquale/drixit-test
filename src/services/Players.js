import players from './mock.json'

export default {
  get: () => new Promise(resolve => setTimeout(() => resolve(players.map((player, playerIndex) => ({
    id: playerIndex,
    ...player,
  }))), 1500)),
}
