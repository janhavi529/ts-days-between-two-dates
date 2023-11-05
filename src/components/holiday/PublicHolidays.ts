import { CertainDayPublicHoliday } from './CertainDayPublicHoliday';
import { FixedDayPublicHoliday } from './FixedDayPublicHoliday';
import { HolidayType } from './HolidayType';

/**
 * Container class for all public holidays.
 */
export class PublicHolidays {
  private holidays: HolidayType[] = [];

  // Getter for holidays.
  getPublicHolidays(): HolidayType[] {
    return this.holidays;
  }

  // Push public holidays of different types to the list of holidays.
  pushPublicHolidays(holidayList: Array<object>): void {
    holidayList.map((holiday: any) => {
      switch (holiday.type) {
        case 'FixedDay':
          this.holidays.push(
            new FixedDayPublicHoliday(holiday.month, holiday.date)
          );

          break;
        case 'CertainDay':
          this.holidays.push(
            new CertainDayPublicHoliday(
              holiday.month,
              holiday.day,
              holiday.week
            )
          );

          break;
      }
    });
  }

  // Check if the passed in date is of a valid HolidayType.
  isHoliday(date: Date): boolean {
    // TODO: Optimise
    for (const holidayType of this.getPublicHolidays()) {
      if (holidayType.isHoliday(date)) {
        return true;
      }
    }
    return false;
  }
}
