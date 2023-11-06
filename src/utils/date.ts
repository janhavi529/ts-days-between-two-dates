/**
 * Helper function to check if a given date is a weekend (Saturday or Sunday)
 *
 * @param {Date} date Input date
 * @returns {Boolean} Whether it is a Saturday/Sunday
 */
const isWeekend = (date: Date): boolean => {
  const day = date.getDay();
  return isWeekendDay(day);
};

/**
 * Helper function to check if a given day is a weekend (Saturday or Sunday)
 *
 * @param {Number} day Input day
 * @returns {Boolean} Whether it is a Saturday/Sunday
 */
const isWeekendDay = (day: number): boolean => {
  return day === 0 || day === 6;
};

/**
 * Helper function to get number of days in date range.
 *
 * @param {Date} firstDate Start Date
 * @param {Date} secondDate End Date
 * @param {Boolean} inclusive Whether to include the start and end dates
 * @returns {Number} Number of days
 */
const getDaysBetweenDateRange = (
  firstDate: Date,
  secondDate: Date,
  inclusive: boolean
): number => {
  const timeDifference = secondDate.getTime() - firstDate.getTime();
  const millisecondsPerDay = 1000 * 60 * 60 * 24;
  const totalDays = Math.floor(timeDifference / millisecondsPerDay);
  const numberOfDays = inclusive ? totalDays + 1 : totalDays - 1;

  return numberOfDays;
};

export { isWeekend, isWeekendDay, getDaysBetweenDateRange };
