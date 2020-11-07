import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import moment from 'moment'
import PerfectScrollbar from 'react-perfect-scrollbar'
import Skeleton from '@material-ui/lab/Skeleton'
import WeightCard from './WeightCard'
import Size from '../../utils/size/Size'
import { Color } from '../../assets/theme'
import previousWeightCard from '../../utils/stats/previousWeightCard'

const List = styled.div`
  width: ${Size.PX_480};
  height: 100%;
  padding-top: ${Size.PX_24};
  padding-bottom: ${Size.PX_24};
  border-right: ${(p) => `1px solid${p.theme[Color.BORDER]}`};

  @media (max-width: 768px) {
    width: 100%;
    border-right: 0;
  }
`

const Container = styled.div`
  padding-left: ${Size.PX_24};
  padding-right: ${Size.PX_24};
`

const WeightList = (props) => {
  const { weights, onDelete, isFetching } = props

  const orderedWeights = Object.values(weights).sort((weight1, weight2) => {
    return moment.utc(weight1.date).isAfter(moment.utc(weight2.date)) ? -1 : 1
  })

  if (isFetching) {
    return (
      <List>
        <Container>
          {Array.from(Array(10).keys()).map((i) => (
            <Skeleton
              key={i}
              variant="rect"
              height={150}
              style={{ marginBottom: Size.PX_24 }}
            />
          ))}
        </Container>
      </List>
    )
  }

  return (
    <List>
      <PerfectScrollbar>
        <Container>
          {orderedWeights.map((w) => (
            <WeightCard
              weight={w}
              previous={previousWeightCard(weights, w.date)}
              onDelete={onDelete}
            />
          ))}
        </Container>
      </PerfectScrollbar>
    </List>
  )
}

WeightList.propTypes = {
  weights: PropTypes.objectOf(PropTypes.any).isRequired,
  onDelete: PropTypes.func,
  isFetching: PropTypes.bool,
}

WeightList.defaultProps = {
  onDelete: undefined,
  isFetching: false,
}

export default WeightList
