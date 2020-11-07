import moment from 'moment'

export const DATE_FORMAT = 'DD/MM/YYYY'

const previousWeightCard = (weightsById, currentDate) => {
  const previousDayFormat = moment
    .utc(currentDate)
    .subtract(1, 'days')
    .format(DATE_FORMAT)
  const previousWeekFormat = moment
    .utc(currentDate)
    .subtract(1, 'weeks')
    .format(DATE_FORMAT)
  const previousMonthFormat = moment
    .utc(currentDate)
    .subtract(1, 'months')
    .format(DATE_FORMAT)
  const previousYearFormat = moment
    .utc(currentDate)
    .subtract(1, 'years')
    .format(DATE_FORMAT)

  const previousDay = Object.values(weightsById).find(
    (weight) =>
      moment.utc(weight.date).format(DATE_FORMAT) === previousDayFormat
  )
  const previousWeek = Object.values(weightsById).find(
    (weight) =>
      moment.utc(weight.date).format(DATE_FORMAT) === previousWeekFormat
  )
  const previousMonth = Object.values(weightsById).find(
    (weight) =>
      moment.utc(weight.date).format(DATE_FORMAT) === previousMonthFormat
  )
  const previousYear = Object.values(weightsById).find(
    (weight) =>
      moment.utc(weight.date).format(DATE_FORMAT) === previousYearFormat
  )

  return {
    daily: previousDay?.weight,
    weekly: previousWeek?.weight,
    monthly: previousMonth?.weight,
    yearly: previousYear?.weight,
  }
}

export default previousWeightCard
