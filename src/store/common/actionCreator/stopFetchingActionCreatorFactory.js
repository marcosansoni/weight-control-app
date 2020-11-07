export const STOP_FETCH = 'STOP_FETCH'

const stopFetchingActionCreatorFactory = (view) => ({
  type: STOP_FETCH,
  view,
})

export default stopFetchingActionCreatorFactory
