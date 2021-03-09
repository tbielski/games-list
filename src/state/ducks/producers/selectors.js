const allProducers = (state) => {
  return state.entities.producers.allIds.map(
    (id) => state.entities.producers.byId[id]
  );
};
const selectorsProducers = { allProducers };

export default selectorsProducers;
