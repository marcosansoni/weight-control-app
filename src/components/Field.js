import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Color } from '../assets/theme'
import ValidationStatus from '../utils/validation/ValidationStatus'
import Size from '../utils/size/Size'

const Title = styled.div`
  color: ${(p) => p.theme[Color.ON_BACKGROUND]};
  font-size: ${Size.PX_18};
  font-weight: bold;
`

const ContainerInput = styled.div`
  min-height: ${Size.PX_48};
`

const Description = styled.div`
  color: ${(p) =>
    p.status === ValidationStatus.ERROR
      ? p.theme[Color.ERROR]
      : p.theme[Color.ON_BACKGROUND]};
  font-size: ${Size.PX_14};
  min-height: ${Size.PX_32};
  padding-top: ${Size.PX_8};
`

const Container = styled.div``

const Field = (props) => {
  const { children, style, className, title, description, status } = props

  return (
    <Container style={style} className={className}>
      {title && <Title>{title}</Title>}
      <ContainerInput>{children}</ContainerInput>
      <Description status={status}>{description}</Description>
    </Container>
  )
}

Field.propTypes = {
  status: PropTypes.oneOf([ValidationStatus.ERROR, ValidationStatus.VALID]),
  style: PropTypes.objectOf(PropTypes.any),
  className: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  description: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
}

Field.defaultProps = {
  status: ValidationStatus.VALID,
  style: undefined,
  className: undefined,
  children: undefined,
  title: undefined,
  description: undefined,
}

export default Field
