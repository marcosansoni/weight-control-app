const SessionActionType = {
  SET_SESSION: 'SET_SESSION',
  RESET_SESSION: 'RESET_SESSION',
}

export const setSessionAction = (session) => ({
  type: SessionActionType.SET_SESSION,
  payload: { session },
})

export const restSessionAction = () => ({
  type: SessionActionType.RESET_SESSION,
})

const sessionReducer = (state = null, action) => {
  switch (action.type) {
    case SessionActionType.SET_SESSION:
      if (action?.payload?.session) return action.payload.session
      return state
    case SessionActionType.RESET_SESSION:
      return null
    default:
      return state
  }
}

export default sessionReducer
