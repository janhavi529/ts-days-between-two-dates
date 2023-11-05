import { HolidayType } from './HolidayType';

export class AdjustedDayPublicHoliday extends HolidayType {
  private month: number;
  private day: number;

  constructor(month: number, day: number) {
    super();
    this.month = month;
    this.day = day;
  }

  // TODO: Combine with FixedDayHoliday
  isHoliday(date: Date): boolean {
    if (date.getMonth() + 1 === this.month && date.getDate() === this.day) {
      if (date.getDay() === 0) {
        // Sunday
        return true;
      }
      if (date.getDay() === 6) {
        // Saturday
        return true;
      }
    }
    return false;
  }
}
