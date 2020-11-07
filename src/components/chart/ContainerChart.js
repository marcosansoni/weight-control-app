import React, { useEffect, useRef } from 'react'
import { Skeleton } from '@material-ui/lab'
import PropTypes from 'prop-types'
import Size from '../../utils/size/Size'

const ContainerChart = (props) => {
  const { isFetching, onDimensionChange, chart, dimensions } = props

  const containerRef = useRef()

  useEffect(() => {
    const height = containerRef?.current?.scrollHeight
    const width = containerRef?.current?.scrollWidth

    if (height && width && dimensions.width !== width) {
      onDimensionChange({ height, width })
    }
  }, [containerRef])

  return (
    <div ref={containerRef} style={{ width: '100%', height: '100%' }}>
      {isFetching ? (
        <Skeleton
          height="100%"
          variant="rect"
          style={{ marginTop: Size.PX_24 }}
        />
      ) : (
        chart
      )}
    </div>
  )
}

ContainerChart.propTypes = {
  onDimensionChange: PropTypes.func.isRequired,
  chart: PropTypes.element.isRequired,
  isFetching: PropTypes.bool.isRequired,
  dimensions: PropTypes.shape({
    width: PropTypes.number,
    height: PropTypes.number,
  }).isRequired,
}

export default ContainerChart
