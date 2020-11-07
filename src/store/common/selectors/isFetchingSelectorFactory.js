const isFetchingSelectorFactory = (view) => (state) => state[view].isFetching

export default isFetchingSelectorFactory
