import AdjustedHolidayType from './types/AdjustedHolidayType';
import CertainDayHolidayType from './types/CertainDayHolidayType';
import FixedHolidayType from './types/FixedHolidayType';
import HolidayType from './types/HolidayType';

/**
 * Container class for all public holidays.
 */
export default class PublicHolidays {
  private holidays: HolidayType[] = [];

  /**
   * Getter for holidays.
   */
  getPublicHolidays(): HolidayType[] {
    return this.holidays;
  }

  /**
   * Push public holidays of different types to the list of holidays.
   *
   * @param {Array} holidayList Array of objects containing type of holiday and its details.
   */
  pushPublicHolidays(holidayList: Array<object>): void {
    // Push public holidays to the data structure based on the type of holiday.
    holidayList.map((holiday: any) => {
      switch (holiday.type) {
        case 'FixedDay':
          this.holidays.push(new FixedHolidayType(holiday.month, holiday.date));

          break;

        case 'AdjustedDay':
          this.holidays.push(
            new AdjustedHolidayType(holiday.month, holiday.date)
          );

          break;

        case 'CertainDay':
          this.holidays.push(
            new CertainDayHolidayType(holiday.month, holiday.day, holiday.week)
          );

          break;
      }
    });
  }

  /**
   * Check if the passed in date is of a valid HolidayType.
   *
   * @param {Date} date Any valid date.
   */
  isHoliday(date: Date): boolean {
    for (const holidayType of this.getPublicHolidays()) {
      if (holidayType.isHoliday(date)) {
        return true;
      }
    }
    return false;
  }
}
