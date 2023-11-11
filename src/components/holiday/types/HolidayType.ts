/**
 * Abstract base class for holiday types.
 */
export default abstract class HolidayType {
  /**
   * Enforcing that all child classes implement the "isHoliday" method.
   *
   * @param {Date} date Any date
   * @returns {Boolean} Whether the date is a holiday
   */
  abstract isHoliday(date: Date): boolean;
}
