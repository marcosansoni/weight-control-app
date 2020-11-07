import React, { useState } from 'react'
import styled, { useTheme } from 'styled-components'
import PropTypes from 'prop-types'
import moment from 'moment'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp'
import Size from '../../utils/size/Size'
import { Color } from '../../assets/theme'

const Card = styled.div`
  width: 100%;
  padding: ${Size.PX_16};
  border-radius: ${Size.PX_8};
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.12);
  margin-bottom: ${Size.PX_24};
`

const Row = styled.div`
  display: flex;
  justify-content: space-between;
`

const Seperator = styled.div`
  height: 1px;
  background-color: ${(p) => p.theme[Color.TEXT]};
  width: 100%;
  margin: ${`${Size.PX_8} 0`};
`

const Action = styled.div`
  font-size: ${Size.PX_16};
  font-weight: bold;
  color: ${(p) => p.theme[Color.TEXT]};
  cursor: pointer;
`

const NumberWeight = styled.div`
  font-size: ${Size.PX_48};
  font-weight: bold;
`

const Unit = styled.div`
  padding-left: ${Size.PX_8};
  font-size: ${Size.PX_16};
  font-weight: bold;
`

const Flex = styled.div`
  display: flex;
  align-items: baseline;
`

const Title = styled.div`
  font-size: ${Size.PX_18};
  font-weight: bold;
  padding-right: 8px;
`

const Value = styled.div`
  font-size: ${Size.PX_18};
  font-weight: unset;
  color: ${(p) => p.color};
`

const Center = styled.div`
  display: ${(p) => p.center && 'flex'};
  align-items: ${(p) => p.center && 'center'};
  min-height: ${(p) => p.center && '100%'};
`

const ContainerIcon = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  color: ${(p) => p.color};
`

const WeightCard = (props) => {
  const { weight, style, className, previous, onDelete } = props

  const [isShowedStats, setIsShowedStats] = useState(false)

  const theme = useTheme()

  const { weight: weightValue, note, date, id } = weight
  const { daily, weekly, monthly, yearly } = previous

  const renderWightDiff = (previousWeight) => {
    if (!previousWeight) return ''

    const color = previousWeight > weightValue ? Color.SUCCESS : Color.ERROR
    const sign = previousWeight > weightValue ? '-' : '+'
    const difference = `${Math.abs(
      Number(previousWeight - weightValue).toFixed(1)
    )} kg`
    const icon =
      previousWeight > weightValue ? (
        <ArrowDropDownIcon color="inherit" />
      ) : (
        <ArrowDropUpIcon color="inherit" />
      )

    return (
      <>
        <Value
          style={{ paddingLeft: Size.PX_8, fontWeight: 'bold' }}
          color={theme[color]}
        >
          {`${sign}${difference}`}
        </Value>
        <ContainerIcon color={theme[color]}>{icon}</ContainerIcon>
      </>
    )
  }

  return (
    <Card style={style} className={className}>
      <Row>
        <Center center={!note} style={{ paddingRight: Size.PX_24 }}>
          <Flex>
            <Title>Date:</Title>
            <Value style={{ fontSize: Size.PX_18 }}>
              {moment.utc(date).format('DD-MM-YYYY')}
            </Value>
          </Flex>
          {note && (
            <>
              <Title style={{ paddingTop: Size.PX_16 }}>Note</Title>
              <Value style={{ paddingTop: Size.PX_12 }}>{note}</Value>
            </>
          )}
        </Center>
        <Center center>
          <Flex>
            <NumberWeight>{weightValue}</NumberWeight>
            <Unit>kg</Unit>
          </Flex>
        </Center>
      </Row>
      <Seperator />
      <Row>
        <Action onClick={() => setIsShowedStats((s) => !s)}>
          {isShowedStats ? 'Hide Stats' : 'Show Stats'}
        </Action>
        <Action onClick={() => onDelete(id)}>Delete</Action>
      </Row>
      <Row style={{ flexWrap: 'wrap' }}>
        {isShowedStats && (
          <>
            <Flex
              style={{
                minWidth: Size.PX_260,
                paddingTop: Size.PX_16,
                alignItems: 'center',
              }}
            >
              <Title>Daily:</Title>
              <Value>{daily ? `${daily} kg` : '-'}</Value>
              {renderWightDiff(daily)}
            </Flex>
            <Flex
              style={{
                minWidth: Size.PX_260,
                paddingTop: Size.PX_16,
                alignItems: 'center',
              }}
            >
              <Title>Weekly:</Title>
              <Value>{weekly ? `${weekly} kg` : '-'}</Value>
              {renderWightDiff(weekly)}
            </Flex>
            <Flex
              style={{
                minWidth: Size.PX_260,
                paddingTop: Size.PX_16,
                alignItems: 'center',
              }}
            >
              <Title>Monthly:</Title>
              <Value>{monthly ? `${monthly} kg` : '-'}</Value>
              {renderWightDiff(monthly)}
            </Flex>
            <Flex
              style={{
                minWidth: Size.PX_260,
                paddingTop: Size.PX_16,
                alignItems: 'center',
              }}
            >
              <Title>Yearly:</Title>
              <Value>{yearly ? `${yearly} kg` : '-'}</Value>
              {renderWightDiff(yearly)}
            </Flex>
          </>
        )}
      </Row>
    </Card>
  )
}

WeightCard.propTypes = {
  weight: PropTypes.objectOf(PropTypes.any).isRequired,
  style: PropTypes.objectOf(PropTypes.any),
  className: PropTypes.string,
  previous: PropTypes.shape({
    daily: PropTypes.number,
    weekly: PropTypes.number,
    monthly: PropTypes.number,
    yearly: PropTypes.number,
  }),
  onDelete: PropTypes.func,
}

WeightCard.defaultProps = {
  style: undefined,
  className: undefined,
  previous: {},
  onDelete: undefined,
}

export default WeightCard
