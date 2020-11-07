export const WEIGHTS_REQUEST = 'WEIGHTS_REQUEST'

const weightsRequestActionCreator = (payload) => ({
  type: WEIGHTS_REQUEST,
  payload,
})

export default weightsRequestActionCreator
