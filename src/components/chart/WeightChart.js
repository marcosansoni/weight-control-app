import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Size from '../../utils/size/Size'
import { Color } from '../../assets/theme'
import HeaderChart from './HeaderChart'
import LineChart from './LineChart'
import ContainerChart from './ContainerChart'
import AreaChart from './AreaChart'
import PreviousOption from '../../utils/weight/PreviousOption'
import ChartType from '../../utils/weight/ChartType'
import dataWeightAbsoluteChart from '../../utils/weight/dataWeightAbsoluteChart'
import dataWeightDifferenceChart from '../../utils/weight/dataWeightDifferenceChart'
import Button from '../input/Button'

const Container = styled.div`
  display: flex;
  width: ${`calc(100% - ${Size.PX_550})`};
  justify-content: center;
  padding: ${Size.PX_48};
  flex-direction: column;

  @media (max-width: 768px) {
    display: none;
  }
`

const ChangeChart = styled.span`
  padding-left: ${Size.PX_10};
  font-weight: unset;
  font-size: ${Size.PX_14};
  cursor: pointer;
  color: ${p => p.theme[Color.PRIMARY_STANDARD]};
  :hover{
    text-decoration: underline;
  }
`

const mapData = (weights, type, previousOption, interval) => {
  if (type === ChartType.WEIGHT)
    return dataWeightAbsoluteChart(weights, interval)
  return dataWeightDifferenceChart(weights, interval, previousOption)
}

const WeightChart = (props) => {
  const { weights, isFetching, interval } = props

  const [previousOption, setPreviousOption] = useState(PreviousOption.DAILY)
  const [type, setType] = useState(ChartType.WEIGHT)

  const [data, setData] = useState(
    mapData(weights, type, previousOption, interval)
  )

  const [dimensions, setDimensions] = useState({
    height: 0,
    width: 0,
  })

  useEffect(() => {
    setData(mapData(weights, type, previousOption, interval))
  }, [JSON.stringify(weights)])

  const handleChangeChart = (updatedType) => {
    setType(updatedType)
    setData(mapData(weights, updatedType, previousOption, interval))
  }

  const handleChangePreviousOption = (updatedPreviousOption) => {
    setPreviousOption(updatedPreviousOption)
    setData(mapData(weights, type, updatedPreviousOption, interval))
  }

  const renderSecondaryActions = () => {
    return (
      <>
        <div style={{ fontWeight: 'bold' }}>Select an options:</div>
        <Button
          selected={previousOption === PreviousOption.DAILY}
          onClick={() => handleChangePreviousOption(PreviousOption.DAILY)}
        >
          Daily
        </Button>
        <Button
          selected={previousOption === PreviousOption.WEEKLY}
          onClick={() => handleChangePreviousOption(PreviousOption.WEEKLY)}
        >
          Weekly
        </Button>
        <Button
          selected={previousOption === PreviousOption.MONTHLY}
          onClick={() => handleChangePreviousOption(PreviousOption.MONTHLY)}
        >
          Monthly
        </Button>
        <Button
          selected={previousOption === PreviousOption.YEARLY}
          onClick={() => handleChangePreviousOption(PreviousOption.YEARLY)}
        >
          Yearly
        </Button>
      </>
    )
  }

  const renderChart = () => {
    if (type === ChartType.WEIGHT) {
      return (
        <LineChart
          data={data}
          height={dimensions.height}
          width={dimensions.width}
        />
      )
    }
    if (type === ChartType.DIFFERENCE) {
      return (
        <AreaChart
          data={data}
          height={dimensions.height}
          width={dimensions.width}
        />
      )
    }
    return null
  }

  const renderTitle = () => {
    return (
      <>
        {type === ChartType.DIFFERENCE ? 'Delta' : 'Absolute weight'}
        <ChangeChart
          onClick={() =>
            handleChangeChart(
              type === ChartType.DIFFERENCE
                ? ChartType.WEIGHT
                : ChartType.DIFFERENCE
            )}
        >
          {type === ChartType.DIFFERENCE
            ? 'Check absolute weight'
            : 'Check delta'}
        </ChangeChart>
      </>
    )
  }

  return (
    <Container>
      <HeaderChart
        isFetching={isFetching}
        title={renderTitle()}
        actions={type === ChartType.DIFFERENCE
          ? renderSecondaryActions()
          : undefined}
      />
      <ContainerChart
        isFetching={isFetching}
        chart={renderChart()}
        onDimensionChange={setDimensions}
        dimensions={dimensions}
      />
    </Container>
  )
}

WeightChart.propTypes = {
  weights: PropTypes.objectOf(PropTypes.any).isRequired,
  isFetching: PropTypes.bool,
  interval: PropTypes.string.isRequired,
}

WeightChart.defaultProps = {
  isFetching: false,
}

export default WeightChart
