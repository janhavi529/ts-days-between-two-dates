import { HolidayType } from './HolidayType';

export class FixedDayPublicHoliday extends HolidayType {
  private month: number;
  private day: number;

  constructor(month: number, day: number) {
    super();
    this.month = month;
    this.day = day;
  }

  isHoliday(date: Date): boolean {
    const currMonth = date.getMonth() + 1; // As index of getMonth() starts from 0
    const currDate = date.getDate();

    // Check if the passed in date exists as a 'FixedDayPublicHoliday' type inside the PublicHoliday list.
    return currMonth === this.month && currDate === this.day;
  }
}
