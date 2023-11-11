import HolidayType from './HolidayType';

/**
 * Derived class for public holiday types which are always on the same day, e.g. Anzac Day on April 25th every year.
 */
export default class FixedHolidayType extends HolidayType {
  private month: number;
  private day: number;

  /**
   * Constructor for FixedHolidayType.
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
   * Check if the passed in date is a fixed holiday.
   *
   * @param {Date} date Any date
   * @returns {Boolean} If the date is a fixed holiday
   */
  isHoliday(date: Date): boolean {
    const currMonth = date.getMonth() + 1; // As index of getMonth() starts from 0
    const currDate = date.getDate();

    // Check if the passed in date exists as a 'FixedHolidayType' type inside the HolidayType list.
    return currMonth === this.month && currDate === this.day;
  }

  getDateForYear(year: number): Date {
    return new Date(year, this.month - 1, this.day);
  }
}
