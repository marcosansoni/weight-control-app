const isFetchingSelectorFactory = (entity) => (state) => state[entity].isFetching

export default isFetchingSelectorFactory
