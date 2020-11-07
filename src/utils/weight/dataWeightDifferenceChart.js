import moment from 'moment'
import Interval, { fromIntervalToDays } from './Interval'
import PreviousOption from './PreviousOption'
import { DATE_FORMAT } from '../stats/previousWeightCard'
import { sortWeight } from './dataWeightAbsoluteChart'

const differenceWeight = (weights, previousOption) => {
  return weights.map((w) => {
    let previousDate
    if (previousOption === PreviousOption.DAILY) {
      previousDate = moment.utc(w.date).subtract(1, 'days').format(DATE_FORMAT)
    }
    if (previousOption === PreviousOption.WEEKLY) {
      previousDate = moment.utc(w.date).subtract(1, 'weeks').format(DATE_FORMAT)
    }
    if (previousOption === PreviousOption.MONTHLY) {
      previousDate = moment
        .utc(w.date)
        .subtract(1, 'months')
        .format(DATE_FORMAT)
    }
    if (previousOption === PreviousOption.YEARLY) {
      previousDate = moment.utc(w.date).subtract(1, 'years').format(DATE_FORMAT)
    }
    // Check the previous value
    const previousWeight = weights.find(
      (weight) => moment.utc(weight.date).format(DATE_FORMAT) === previousDate
    )
    return {
      name: moment.utc(w.date).format(DATE_FORMAT),
      weight: previousWeight
        ? Number(w.weight - previousWeight.weight).toFixed(2)
        : null,
    }
  })
}

const dataWeightDifferenceChart = (weights, interval, previousOption) => {
  const today = moment.utc()

  const filterWeights =
    interval !== Interval.UNLIMITED
      ? Object.values(weights).filter((w) => {
          return moment
            .utc(w.date)
            .add(fromIntervalToDays(interval), 'days')
            .isAfter(today)
        })
      : Object.values(weights)

  console.log(differenceWeight(sortWeight(filterWeights), previousOption))

  return differenceWeight(sortWeight(filterWeights), previousOption)
}

export default dataWeightDifferenceChart
