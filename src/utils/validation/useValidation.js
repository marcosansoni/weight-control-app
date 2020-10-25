import { useState } from 'react'
import isEqual from 'lodash/isEqual'
import ValidationStatus from './ValidationStatus'

const testValidators = (value, validators) => {
  let errors = []
  let status = ValidationStatus.VALID

  validators.forEach((v) => {
    const messageError = v(value)
    if (messageError) {
      errors = [...errors, messageError]
      if (status !== ValidationStatus.ERROR) status = ValidationStatus.ERROR
    }
  })

  return { status, errors }
}

const useValidation = ({
  value: valueProps = '',
  defaultHiddenError = true,
  validators,
}) => {
  const [value, setValue] = useState(valueProps)

  const { status: statusMount, errors: errorsMount } = testValidators(
    valueProps,
    validators
  )

  const [status, setStatus] = useState(statusMount)
  const [errors, setErrors] = useState(errorsMount)

  const [hiddenError, setHiddenError] = useState(defaultHiddenError)

  const handleChange = (updatedValue, hidden = false) => {
    const { status: updatedStatus, errors: updatedErrors } = testValidators(
      updatedValue,
      validators
    )
    if (updatedStatus !== status) setStatus(updatedStatus)
    if (!isEqual(updatedErrors, errors)) setErrors(updatedErrors)
    setValue(updatedValue)
    setHiddenError(hidden)
  }

  return {
    value,
    status,
    errors: hiddenError ? [] : errors,
    onChange: handleChange,
    hiddenError,
  }
}

export default useValidation
