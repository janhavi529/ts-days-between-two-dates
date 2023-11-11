import HolidayType from './HolidayType';

/**
 * Derived class for public holidays on a certain occurrence of a certain day in a month. e.g. Queen's Birthday on the
second Monday in June every year.
 */
export default class CertainDayHolidayType extends HolidayType {
  private month: number;
  private day: number;
  private week: number;

  /**
   * Constructor for CertainDayHolidayType.
   *
   * @param {Number} month Any month
   * @param {Number} day Any day of the week
   * @param {Number} week Any week of the month
   */
  constructor(month: number, day: number, week: number) {
    super();
    this.month = month;
    this.day = day;
    this.week = week;
  }

  /**
   * Check if the passed in date is a certain day holiday type.
   *
   * @param {Date} date Any date
   * @returns {Boolean} If the date is a certain day holiday
   */
  isHoliday(date: Date): boolean {
    const currYear = date.getFullYear();
    const currMonth = date.getMonth() + 1;
    const currDay = date.getDay();

    // Check if the date's month and day are the same as the month and day of the holiday from the PublicHolidays list.
    if (currMonth === this.month && currDay === this.day) {
      // Get the current week for the passed in date.

      // Start from the first day of the month.
      const currentDate = new Date(`${currYear}-${currMonth}-01`);

      let currentWeek = 1;

      // Loop through all weeks from first day of the month until the passed in date.
      while (
        currentDate.getDate() + 7 <= date.getDate() &&
        currentDate.getMonth() === date.getMonth()
      ) {
        // Increment to the next week.
        currentDate.setDate(currentDate.getDate() + 7);
        currentWeek++;
      }

      return currentWeek === this.week;
    }

    return false;
  }
}
