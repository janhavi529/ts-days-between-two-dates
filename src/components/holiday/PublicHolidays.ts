import { HolidayType } from './HolidayType';

/**
 * Container class for all public holidays.
 */
export class PublicHolidays {
  private holidays: HolidayType[] = [];

  // Getter for holidays
  getPublicHolidays(): HolidayType[] {
    return this.holidays;
  }

  // Push public holidays of different types to the list of holidays.
  addPublicHoliday(type: HolidayType): void {
    this.holidays.push(type);
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
