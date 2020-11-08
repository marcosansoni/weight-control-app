import React from 'react'
import {
  Area,
  AreaChart as RechartsAreaChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import PropTypes from 'prop-types'
import Size from '../../utils/size/Size'

const AreaChart = (props) => {
  const { data, height, width } = props

  const gradientOffset = () => {
    const dataMax = Math.max(...data.map((i) => i.weight))
    const dataMin = Math.min(...data.map((i) => i.weight))

    if (dataMax <= 0) {
      return 0
    }
    if (dataMin >= 0) {
      return 1
    }

    return dataMax / (dataMax - dataMin)
  }

  const off = gradientOffset()

  return (
    <RechartsAreaChart
      width={width}
      height={height}
      data={data}
      style={{ margin: Size.PX_20 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis domain={['dataMin - 2', 'dataMax + 2']} />
      <Tooltip />
      <defs>
        <linearGradient id="splitColor" x1="0" y1="0" x2="0" y2="1">
          <stop offset={off} stopColor="red" stopOpacity={1} />
          <stop offset={off} stopColor="green" stopOpacity={1} />
        </linearGradient>
      </defs>
      <Area
        type="monotone"
        dataKey="weight"
        stroke="#000"
        fill="url(#splitColor)"
      />
    </RechartsAreaChart>
  )
}

AreaChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.any).isRequired,
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
}

export default AreaChart
