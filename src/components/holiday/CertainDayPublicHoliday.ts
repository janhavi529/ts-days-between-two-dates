import { HolidayType } from './HolidayType';

export class CertainDayPublicHoliday extends HolidayType {
  private month: number;
  private day: number;
  private week: number;

  constructor(month: number, day: number, week: number) {
    super();
    this.month = month;
    this.day = day;
    this.week = week;
  }

  isHoliday(date: Date): boolean {
    if (date.getMonth() + 1 === this.month) {
      const firstDayOfMonth = new Date(date.getFullYear(), this.month - 1, 1);
      const day = firstDayOfMonth.getDay();
      const targetDate = new Date(date);
      targetDate.setDate(targetDate.getDate() - day + 1);

      let count = 0;
      while (targetDate.getMonth() === this.month - 1) {
        if (targetDate.getDay() === this.day) {
          count++;
          if (count === this.week) {
            return date.getDate() === targetDate.getDate();
          }
        }
        targetDate.setDate(targetDate.getDate() + 7);
      }
    }
    return false;
  }
}
