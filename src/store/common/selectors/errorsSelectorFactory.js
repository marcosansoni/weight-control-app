const errorSelectorFactory = (view) => (state) => state[view].errors

export default errorSelectorFactory
