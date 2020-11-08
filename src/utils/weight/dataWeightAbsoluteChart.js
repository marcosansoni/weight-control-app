import moment from 'moment'
import { DATE_FORMAT } from '../stats/previousWeightCard'
import Interval, { fromIntervalToDays } from './Interval'

export const sortWeight = (weights) =>
  weights.sort((weight1, weight2) => {
    return moment.utc(weight1.date).isBefore(moment.utc(weight2.date)) ? -1 : 1
  })

export const sortWeightDescending = (weights) =>
  weights.sort((weight1, weight2) => {
    return moment.utc(weight1.date).isBefore(moment.utc(weight2.date)) ? 1 : -1
  })

const mapWeights = (sortedWeights) => {
  return sortedWeights.map((w) => ({
    name: moment.utc(w.date).format(DATE_FORMAT),
    weight: w.weight,
  }))
}

export const filterWeight = (weights, interval) => {
  return interval !== Interval.UNLIMITED
    ? Object.values(weights).filter((w) => {
        return moment
          .utc(w.date)
          .add(fromIntervalToDays(interval), 'days')
          .isAfter(moment.utc())
      })
    : Object.values(weights)
}

const dataWeightAbsoluteChart = (weights, interval) => {
  return mapWeights(sortWeight(filterWeight(weights, interval)))
}

export default dataWeightAbsoluteChart
