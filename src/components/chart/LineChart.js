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
import Size from '../../utils/size/Size'

const LineChart = (props) => {
  const { data, height, width } = props

  return (
    <RechartsLineChart
      style={{ margin: Size.PX_20 }}
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
        stroke="#8884d8"
        fill="#8884d8"
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
