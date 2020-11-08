import React, { useMemo } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import PerfectScrollbar from 'react-perfect-scrollbar'
import Skeleton from '@material-ui/lab/Skeleton'
import { useHistory } from 'react-router-dom'
import WeightCard from './WeightCard'
import Size from '../../utils/size/Size'
import previousWeightCard from '../../utils/stats/previousWeightCard'
import { filterWeight, sortWeightDescending } from '../../utils/weight/dataWeightAbsoluteChart'
import { Color } from '../../assets/theme'
import Interval from '../../utils/weight/Interval'
import Routes from '../../Routes'

const List = styled.div`
  width: ${Size.PX_550};
  height: ${`calc(100% - ${Size.PX_48})`};
  margin: ${Size.PX_24};;
  padding: ${`${Size.PX_16} ${Size.PX_16}`};
  background-color: rgba(255, 255, 255, 0.65);
  border-radius: ${Size.PX_8};
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    width: 100%;
    border-right: 0;
    margin: ${Size.PX_24};
  }
`

const Header = styled.div`
  display: flex;
  flex-direction: column;
  font-weight: bold;
  font-size: ${Size.PX_18};
`

const Add = styled.div`
  color: ${(p) => p.theme[Color.PRIMARY_STANDARD]};
  cursor: pointer;
  :hover {
    text-decoration: underline;
  }
`

const Row = styled.div`
  display: flex;
  padding: ${`${Size.PX_12} 0`};
`

const Container = styled.div`
  padding-left: ${Size.PX_24};
  padding-right: ${Size.PX_24};
`

const FilterButton = styled.div`
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

const WeightList = (props) => {
  const { weights, onDelete, isFetching, interval, onChangeInterval } = props
  const history = useHistory()

  const filteredWeight = useMemo(() => {
    return sortWeightDescending(filterWeight(weights, interval))
  }, [weights, interval])

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
      <Header>
        <Row style={{ justifyContent: 'space-between' }}>
          <div>Keep storing your weight!</div>
          <Add onClick={()=> history.push(Routes.HOME+Routes.ADD_WEIGHT)}>Add new</Add>
        </Row>
        <Row style={{ justifyContent: 'flex-end' }}>
          <FilterButton
            selected={interval === Interval.DAYS_7}
            onClick={() => onChangeInterval(Interval.DAYS_7)}
          >
            7 Days
          </FilterButton>
          <FilterButton
            selected={interval === Interval.DAYS_30}
            onClick={() => onChangeInterval(Interval.DAYS_30)}
          >
            30 Days
          </FilterButton>
          <FilterButton
            selected={interval === Interval.DAYS_90}
            onClick={() => onChangeInterval(Interval.DAYS_90)}
          >
            90 Days
          </FilterButton>
          <FilterButton
            selected={interval === Interval.UNLIMITED}
            onClick={() => onChangeInterval(Interval.UNLIMITED)}
          >
            All
          </FilterButton>
        </Row>
      </Header>
      <div style={{ overflow: 'hidden', padding: '0 0 16px 0' }}>
        <PerfectScrollbar>
          <Container>
            {filteredWeight.map((w) => (
              <WeightCard
                weight={w}
                previous={previousWeightCard(weights, w.date)}
                onDelete={onDelete}
              />
            ))}
          </Container>
        </PerfectScrollbar>
      </div>
    </List>
  )
}

WeightList.propTypes = {
  weights: PropTypes.objectOf(PropTypes.any).isRequired,
  onDelete: PropTypes.func,
  isFetching: PropTypes.bool,
  interval: PropTypes.string.isRequired,
  onChangeInterval: PropTypes.func.isRequired,
}

WeightList.defaultProps = {
  onDelete: undefined,
  isFetching: false,
}

export default WeightList
