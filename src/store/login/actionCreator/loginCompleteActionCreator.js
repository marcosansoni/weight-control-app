export const LOGIN = 'LOGIN'

const loginCompleteActionCreator = ({
  username,
  token,
  errors,
  ...otherInfo
}) => ({
  type: LOGIN,
  payload: {
    token,
    username,
    ...(errors && errors.length && { errors }),
    ...otherInfo,
  },
})

export default loginCompleteActionCreator
