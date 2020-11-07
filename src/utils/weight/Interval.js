const Interval = {
  DAYS_7: 'DAYS_7',
  DAYS_30: 'DAYS_30',
  DAYS_90: 'DAYS_90',
  UNLIMITED: 'UNLIMITED',
}

export const fromIntervalToDays = (interval) => {
  switch (interval) {
    case Interval.DAYS_7:
      return 7
    case Interval.DAYS_30:
      return 30
    case Interval.DAYS_90:
      return 90
    default:
      return 0
  }
}

export default Interval
