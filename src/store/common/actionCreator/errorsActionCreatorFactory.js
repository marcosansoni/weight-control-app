export const ERRORS = 'ERRORS'

const errorsActionCreatorFactory = (view, errors = []) => ({
  type: ERRORS,
  view,
  payload: {
    errors,
  },
})

export default errorsActionCreatorFactory
