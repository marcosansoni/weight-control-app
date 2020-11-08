import React from 'react'
import PropTypes from 'prop-types'
import {
  CartesianGrid,
  Line,
  LineChart as RechartsLineChart,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { useTheme } from 'styled-components'
import Size from '../../utils/size/Size'
import { Color } from '../../assets/theme'

const LineChart = (props) => {
  const { data, height, width } = props

  const theme = useTheme()

  return (
    <RechartsLineChart
      style={{ margin: Size.PX_20, color: theme[Color.ON_BACKGROUND] }}
      width={width}
      height={height}
      data={data}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis domain={['dataMin - 2', 'dataMax + 2']} interval={0} />
      <Tooltip />
      <Line
        connectNulls
        type="monotone"
        dataKey="weight"
        stroke={theme[Color.PRIMARY_STANDARD]}
        fill={theme[Color.PRIMARY_STANDARD]}
      />
    </RechartsLineChart>
  )
}

LineChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.any).isRequired,
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
}

export default LineChart
