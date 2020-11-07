export const DELETE_WEIGHT = 'DELETE_WEIGHT'

const deleteWeightActionCreator = (id) => ({
  type: DELETE_WEIGHT,
  payload: {
    ...(id && { id }),
  },
})

export default deleteWeightActionCreator
