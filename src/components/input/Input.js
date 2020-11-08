import React from 'react'
import PropTypes from 'prop-types'
import TextField from '@material-ui/core/TextField'
import styled from 'styled-components'
import ValidationStatus from '../../utils/validation/ValidationStatus'
import { Color } from '../../assets/theme'
import Size from '../../utils/size/Size'


const CustomizedTextInput = styled(TextField)`
  fieldset {
    border-color: ${(p) =>
      p.error ? p.theme[Color.ERROR] : p.theme[Color.ON_BACKGROUND]};
  }
  input {
    font-family: Poppins, serif;
  }
  font-size: ${Size.PX_16};
  
  // :hover, :focus{
  //   fieldset{
  //     border-color: ${(p) => p.error ? p.theme[Color.ERROR] : p.theme[Color.PRIMARY_HIGHLIGHT]};
  //   }
  // }
`

const Input = (props) => {
  const { status, defaultColor, ...propsInput } = props

  return (
    <>
      <CustomizedTextInput
        {...propsInput}
        error={status === ValidationStatus.ERROR}
        variant="outlined"
      />
    </>
  )
}

Input.propTypes = {
  status: PropTypes.oneOf([ValidationStatus.ERROR, ValidationStatus.VALID]),
  defaultColor: PropTypes.string,
  style: PropTypes.objectOf(PropTypes.any),
  className: PropTypes.string,
}

Input.defaultProps = {
  status: ValidationStatus.VALID,
  defaultColor: Color.PRIMARY_HIGHLIGHT,
  style: undefined,
  className: undefined,
}

export default Input
