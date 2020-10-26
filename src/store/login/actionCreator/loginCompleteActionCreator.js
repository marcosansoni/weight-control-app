export const LOGIN = 'LOGIN'

const loginCompleteActionCreator = ({
  email,
  token,
  errors,
  ...otherInfo
}) => ({
  type: LOGIN,
  payload: {
    ...(token && { token }),
    ...(email && { email }),
    ...(errors && Array.isArray(errors) && { errors }),
    ...otherInfo,
  },
})

export default loginCompleteActionCreator
