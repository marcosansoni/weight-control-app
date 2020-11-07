import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Skeleton } from '@material-ui/lab'
import Size from '../../utils/size/Size'

const Header = styled.div`
  height: ${Size.PX_48};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: ${Size.PX_16};
`

const Title = styled.div`
  padding-left: ${Size.PX_40};
  font-size: ${Size.PX_24};
  font-weight: bold;
`

const Selector = styled.div`
  display: flex;
  align-items: center;
  padding-right: ${Size.PX_20};
`

const HeaderChart = (props) => {
  const { isFetching, title, actions, secondaryActions } = props

  return (
    <>
      <Header>
        <Title>{isFetching ? <Skeleton width={250} /> : title}</Title>
        <Selector>{isFetching ? <Skeleton width={450} /> : actions}</Selector>
      </Header>
      {secondaryActions && (
        <Header style={{ justifyContent: 'flex-end' }}>
          <Selector>
            {isFetching ? <Skeleton width={450} /> : secondaryActions}
          </Selector>
        </Header>
      )}
    </>
  )
}

HeaderChart.propTypes = {
  isFetching: PropTypes.bool,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  actions: PropTypes.element,
  secondaryActions: PropTypes.element,
}

HeaderChart.defaultProps = {
  isFetching: false,
  title: undefined,
  actions: undefined,
  secondaryActions: undefined,
}

export default HeaderChart
