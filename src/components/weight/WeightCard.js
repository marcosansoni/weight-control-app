import React, { useState } from 'react'
import styled, { useTheme } from 'styled-components'
import PropTypes from 'prop-types'
import DeleteIcon from '@material-ui/icons/Delete'
import moment from 'moment'
import Size from '../../utils/size/Size'
import { Color } from '../../assets/theme'

const Card = styled.div`
  width: 100%;
  padding: ${Size.PX_16};
  border-radius: ${Size.PX_8};
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.12);
  margin-bottom: ${Size.PX_24};
  background-color: rgba(255, 255, 255, 0.5);
`

const Row = styled.div`
  display: flex;
  justify-content: space-between;
`

const Left = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-right: ${Size.PX_16};
`

const CircleWeight = styled.div`
  border-radius: 50%;
  border: ${(p) => `4px solid ${p.theme[Color.PRIMARY_STANDARD]}`};
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: ${Size.PX_96};
  max-height: ${Size.PX_96};
  min-width: ${Size.PX_96};
  max-width: ${Size.PX_96};
  font-weight: bold;
  font-size: ${Size.PX_32};
`

const Date = styled.div`
  font-weight: bold;
  font-size: ${Size.PX_18};
  padding-bottom: ${Size.PX_12};
`

const Note = styled.div`
  color: ${(p) => p.note ? p.theme[Color.TEXT] : p.theme[Color.NEUTRAL]};
  font-size: ${Size.PX_14};
  padding-bottom: ${Size.PX_12};
`

const ActionText = styled.div`
  color: ${(p) => p.theme[Color.PRIMARY_STANDARD]};
  font-size: ${Size.PX_14};
  font-weight: bold;
  padding-bottom: ${Size.PX_12};
  cursor: pointer;
`

const TilePrevious = styled.div`
  display: flex;
  flex-direction: column;
  min-width: ${Size.PX_96};
  min-height: ${Size.PX_96};
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.12);
  border-radius: ${Size.PX_16};
  padding: ${Size.PX_16};
`

const TitlePrevious = styled.div`
  font-size: ${Size.PX_14};
  color: ${(p) => p.theme[Color.TEXT]};
`


const ContainerPreviousWeightNumber = styled.div`
  display: flex;
  padding-top: ${Size.PX_18};
  font-weight: bold;
  width: ${Size.PX_75};
  height: ${Size.PX_75};
  flex-direction: column;
  align-items: center;
  font-size: ${Size.PX_18};
`

const Separator = styled.div`
  width: 100%;
  height: 2px;
  border-radius: 2px;
  margin-top: ${Size.PX_4};
  margin-bottom: ${Size.PX_4};
  background-color: ${p => p.differance <= 0 ? p.theme[Color.SUCCESS] : p.theme[Color.ERROR]};
`

const PreviousWeight = (props) => {
  const { title, weight, differance } = props
  const theme = useTheme()
  return (
    <TilePrevious>
      <TitlePrevious>{title}</TitlePrevious>
      <ContainerPreviousWeightNumber>
        {!weight ?
          <div style={{display: 'flex', alignItems: 'center', height: '100%'}}>-</div>
          : (
            <>
              <div
                style={{
              color: differance <= 0 ? theme[Color.SUCCESS] : theme[Color.ERROR],
            }}
              >
                {`${differance>=0 ? "+": "-"} ${Math.abs(differance)}`}
              </div>
              <Separator differance={differance} />
              <div>{weight}</div>
            </>
        )}
      </ContainerPreviousWeightNumber>
    </TilePrevious>
  )
}

PreviousWeight.propTypes = {
  title: PropTypes.string.isRequired,
  weight: PropTypes.number.isRequired,
  differance: PropTypes.number.isRequired,
}

const WeightCard = (props) => {
  const { weight, style, className, previous, onDelete } = props

  const [isShowedStats, setIsShowedStats] = useState(false)

  const { weight: weightValue, note, date, id } = weight
  const { daily, weekly, monthly } = previous

  return (
    <Card style={style} className={className}>
      <Row>
        <Left>
          <Date>{moment.utc(date).format('DD MMMM YYYY')}</Date>
          <Note note={note}>{note || 'No note available'}</Note>
        </Left>
        <CircleWeight>{weightValue}</CircleWeight>
      </Row>
      <Row style={{ paddingTop: Size.PX_14, alignItems: 'center' }}>
        <ActionText onClick={() => setIsShowedStats((s) => !s)}>
          {isShowedStats ? 'Hide weight differance' : 'Show weight differance'}
        </ActionText>
        <ActionText onClick={() => onDelete(id)}>
          <DeleteIcon />
        </ActionText>
      </Row>
      <Row style={{ flexWrap: 'wrap' }}>
        {isShowedStats && (
          <>
            <PreviousWeight
              title="Daily"
              weight={daily}
              differance={Number(weightValue-daily).toFixed(1)}
            />
            <PreviousWeight
              title="Weekly"
              weight={weekly}
              differance={Number(weightValue-weekly).toFixed(1)}
            />
            <PreviousWeight
              title="Monthly"
              weight={monthly}
              differance={Number(weightValue-monthly).toFixed(1)}
            />
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
