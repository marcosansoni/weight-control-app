import moment from 'moment'
import PreviousOption from './PreviousOption'
import { DATE_FORMAT } from '../stats/previousWeightCard'
import { filterWeight, sortWeight } from './dataWeightAbsoluteChart'

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
        ? Number(w.weight - previousWeight.weight).toFixed(1)
        : null,
    }
  })
}

const dataWeightDifferenceChart = (weights, interval, previousOption) => {
  // const today = moment.utc()
  //
  // const filterWeights =
  //   interval !== Interval.UNLIMITED
  //     ? Object.values(weights).filter((w) => {
  //         return moment
  //           .utc(w.date)
  //           .add(fromIntervalToDays(interval), 'days')
  //           .isAfter(today)
  //       })
  //     : Object.values(weights)
  //
  // console.log(differenceWeight(sortWeight(filterWeight(weights, interval)), previousOption))

  return differenceWeight(
    sortWeight(filterWeight(weights, interval)),
    previousOption
  )
}

export default dataWeightDifferenceChart
