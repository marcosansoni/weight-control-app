import PropTypes from 'prop-types'
import styled from 'styled-components'
import React from 'react'
import { Color } from '../../assets/theme'
import Size from '../../utils/size/Size'

const Container = styled.div`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${Size.PX_4};
  border: ${(p) => `1px solid ${p.theme[Color.PRIMARY_STANDARD]}`};
  color: ${(p) =>
    !p.selected ? p.theme[Color.PRIMARY_STANDARD] : p.theme[Color.BACKGROUND]};
  font-size: ${Size.PX_14};
  font-weight: normal;
  margin-left: ${Size.PX_8};
  width: ${Size.PX_75};
  height: ${Size.PX_32};
  cursor: ${(p) => !p.selected && 'pointer'};
  background-color: ${(p) =>
    p.selected && `${p.theme[Color.PRIMARY_STANDARD]}`};

  :hover {
    background-color: ${(p) =>
      !p.selected && `${p.theme[Color.PRIMARY_STANDARD]}85`};
    color: ${(p) => !p.selected && p.theme[Color.BACKGROUND]};
  }
`

const Button = (props) => {
  const { selected, style, className, children, ...otherProps } = props

  return (
    <Container {...otherProps} selected={selected} style={style} className={className}>
      {children}
    </Container>
  )
}

Button.propTypes = {
  selected: PropTypes.bool,
  children: PropTypes.element,
  style: PropTypes.objectOf(PropTypes.any),
  className: PropTypes.string,
}

Button.defaultProps = {
  selected: false,
  children: undefined,
  style: undefined,
  className: undefined,
}

export default Button
