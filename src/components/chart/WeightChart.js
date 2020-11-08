import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Size from '../../utils/size/Size'
import { Color } from '../../assets/theme'
import HeaderChart from './HeaderChart'
import LineChart from './LineChart'
import ContainerChart from './ContainerChart'
import AreaChart from './AreaChart'
import Interval from '../../utils/weight/Interval'
import PreviousOption from '../../utils/weight/PreviousOption'
import ChartType from '../../utils/weight/ChartType'
import dataWeightAbsoluteChart from '../../utils/weight/dataWeightAbsoluteChart'
import dataWeightDifferenceChart from '../../utils/weight/dataWeightDifferenceChart'

const Container = styled.div`
  display: flex;
  width: ${`calc(100% - ${Size.PX_550})`};
  justify-content: center;
  padding: ${`${Size.PX_64} 0 ${Size.PX_64} ${Size.PX_64}`};
  flex-direction: column;

  @media (max-width: 768px) {
    display: none;
  }
`

const SelectorButton = styled.div`
  border-radius: ${Size.PX_4};
  padding: ${Size.PX_8};
  cursor: ${(p) => !p.selected && 'pointer'};
  margin-left: ${Size.PX_16};
  background-color: ${(p) => p.selected && p.theme[Color.SECONDARY]};

  :hover {
    background-color: ${(p) => !p.selected && p.theme[Color.SECONDARY]};
  }
`

const ChangeChart = styled.span`
  padding-left: ${Size.PX_10};
  font-weight: unset;
  font-size: ${Size.PX_14};
  cursor: pointer;
`

const mapData = (weights, type, previousOption, interval) => {
  if (type === ChartType.WEIGHT)
    return dataWeightAbsoluteChart(weights, interval)
  return dataWeightDifferenceChart(weights, interval, previousOption)
}

const WeightChart = (props) => {
  const { weights, isFetching, interval, onChangeInterval } = props

  // const [interval, setInterval] = useState(Interval.UNLIMITED)
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

  const handleChangeInterval = (updatedInterval) => {
    onChangeInterval(updatedInterval)
    setData(mapData(weights, type, previousOption, updatedInterval))
  }

  const handleChangeChart = (updatedType) => {
    setType(updatedType)
    setData(mapData(weights, updatedType, previousOption, interval))
  }

  const handleChangePreviousOption = (updatedPreviousOption) => {
    setPreviousOption(updatedPreviousOption)
    setData(mapData(weights, type, updatedPreviousOption, interval))
  }


  const renderActionsHeader = () => {
    return (
      <>
        <div style={{ fontWeight: 'bold' }}>Select an interval:</div>
        <SelectorButton
          selected={interval === Interval.DAYS_7}
          onClick={() => handleChangeInterval(Interval.DAYS_7)}
        >
          7 Days
        </SelectorButton>
        <SelectorButton
          selected={interval === Interval.DAYS_30}
          onClick={() => handleChangeInterval(Interval.DAYS_30)}
        >
          30 Days
        </SelectorButton>
        <SelectorButton
          selected={interval === Interval.DAYS_90}
          onClick={() => handleChangeInterval(Interval.DAYS_90)}
        >
          90 Days
        </SelectorButton>
        <SelectorButton
          selected={interval === Interval.UNLIMITED}
          onClick={() => handleChangeInterval(Interval.UNLIMITED)}
        >
          All
        </SelectorButton>
      </>
    )
  }

  const renderSecondaryActions = () => {
    return (
      <>
        <div style={{ fontWeight: 'bold' }}>Select an options:</div>
        <SelectorButton
          selected={previousOption === PreviousOption.DAILY}
          onClick={() => handleChangePreviousOption(PreviousOption.DAILY)}
        >
          Daily
        </SelectorButton>
        <SelectorButton
          selected={previousOption === PreviousOption.WEEKLY}
          onClick={() => handleChangePreviousOption(PreviousOption.WEEKLY)}
        >
          Weekly
        </SelectorButton>
        <SelectorButton
          selected={previousOption === PreviousOption.MONTHLY}
          onClick={() => handleChangePreviousOption(PreviousOption.MONTHLY)}
        >
          Monthly
        </SelectorButton>
        <SelectorButton
          selected={previousOption === PreviousOption.YEARLY}
          onClick={() => handleChangePreviousOption(PreviousOption.YEARLY)}
        >
          Yearly
        </SelectorButton>
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
        actions={renderActionsHeader()}
        secondaryActions={type === ChartType.DIFFERENCE
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
  onChangeInterval: PropTypes.func.isRequired,
}

WeightChart.defaultProps = {
  isFetching: false,
}

export default WeightChart
