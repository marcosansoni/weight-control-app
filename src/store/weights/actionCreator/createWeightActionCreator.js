export const CREATE_WEIGHT = 'CREATE_WEIGHT'

const createWeightActionCreator = ({ date, weight, note }) => ({
  type: CREATE_WEIGHT,
  payload: {
    ...(date && { date }),
    ...(weight && { weight }),
    ...(note && { note }),
  },
})

export default createWeightActionCreator
