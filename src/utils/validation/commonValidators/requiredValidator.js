const requiredValidator = (input) => {
  if (!input) return 'Field is required'
  return undefined
}

export default requiredValidator
