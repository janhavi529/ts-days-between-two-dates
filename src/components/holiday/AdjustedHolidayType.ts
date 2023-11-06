import { HolidayType } from './HolidayType';

/**
 * Derived class for public holidays which are always on the same day, except when that falls on a weekend. e.g. New
Year's Day on January 1st every year, unless that is a Saturday or Sunday, in which case the holiday
is the next Monday.
 */
export class AdjustedHolidayType extends HolidayType {
  private month: number;
  private day: number;

  /**
   * Constructor for AdjustedHolidayType.
   *
   * @param {Number} month Any month
   * @param {Number} day Any date
   */
  constructor(month: number, day: number) {
    super();
    this.month = month;
    this.day = day;
  }

  /**
   * Check if the passed in date is a adjusted day holiday type.
   *
   * @param {Date} date Any date
   * @returns {Boolean} If the date is a adjusted day holiday
   */
  isHoliday(date: Date): boolean {
    const currMonth = date.getMonth() + 1; // As index of getMonth() starts from 0
    const currDate = date.getDate();
    const currDay = date.getDay();

    // Check if the passed in date's month and day match a public holiday, and if the day is a Saturday or Sunday. This means that the following Monday will be a holiday.
    if (currMonth === this.month && currDate === this.day) {
      return currDay === 0 || currDay === 6;
    }

    return false;
  }
}
