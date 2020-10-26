const errorSelectorFactory = (entity) => (state) => state[entity].errors

export default errorSelectorFactory
