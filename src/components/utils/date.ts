/**
 * Helper function to check if a given date is a weekend (Saturday or Sunday)
 *
 * @param {Date} date Input date
 * @returns {Boolean} Whether it is a Saturday/Sunday
 */
const isWeekend = (date: Date): boolean => {
  const day = date.getDay();
  return day === 0 || day === 6;
};

export { isWeekend };
