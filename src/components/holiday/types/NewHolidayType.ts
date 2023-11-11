import FixedHolidayType from './FixedHolidayType';

export default class CustomFixedHolidayType extends FixedHolidayType {
  /**
   * Constructor for AdjustedHolidayType.
   *
   * @param {Number} month Any month
   * @param {Number} day Any date
   */
  constructor(month: number, day: number) {
    super(month, day);
  }

  getDateForYear(year: number): Date {
    const date = super.getDateForYear(year);
    // const date = new Date(year, this.month - 1, this.day);

    const adjustedDate = new Date(date);

    if (date.getDay() === 6) {
      adjustedDate.setDate(date.getDate() + 2);
    } else if (date.getDay() === 0) {
      adjustedDate.setDate(date.getDate() + 1);
    }

    return adjustedDate;
  }
}
