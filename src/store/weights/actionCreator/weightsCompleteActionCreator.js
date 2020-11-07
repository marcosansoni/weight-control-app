export const WEIGHTS_COMPLETE = 'WEIGHTS_COMPLETE'

const weightsCompleteActionCreator = (byId = {}) => ({
  type: WEIGHTS_COMPLETE,
  payload: {
     byId ,
  },
})

export default weightsCompleteActionCreator
