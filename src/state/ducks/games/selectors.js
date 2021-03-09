const allGames = (state) => {
  return state.entities.games.allIds.map((id) => state.entities.games.byId[id]);
};
const selectorsGames = { allGames };

export default selectorsGames;
