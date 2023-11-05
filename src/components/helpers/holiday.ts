import { HolidayType } from '../holiday/HolidayType';
import { PublicHolidays } from '../holiday/PublicHolidays';
import { FixedDayPublicHoliday } from '../holiday/FixedDayPublicHoliday';
import { CertainDayPublicHoliday } from '../holiday/CertainDayPublicHoliday';

const getPublicHolidays = (holidays: Array<object>): HolidayType[] => {
  const publicHolidays = new PublicHolidays();

  holidays.map((holiday: any) => {
    switch (holiday.type) {
      case 'FixedDay':
        publicHolidays.addPublicHoliday(
          new FixedDayPublicHoliday(holiday.month, holiday.date)
        );
        break;
      case 'CertainDay':
        publicHolidays.addPublicHoliday(
          new CertainDayPublicHoliday(holiday.month, holiday.day, holiday.week)
        );
        break;
    }
  });

  return publicHolidays.getPublicHolidays();
};

export { getPublicHolidays };
