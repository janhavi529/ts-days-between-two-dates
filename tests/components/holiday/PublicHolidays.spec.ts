import fs from 'fs';
import path from 'path';

import PublicHolidays from '../../../src/components/holiday/PublicHolidays';
import FixedHolidayType from '../../../src/components/holiday/types/FixedHolidayType';
import AdjustedHolidayType from '../../../src/components/holiday/types/AdjustedHolidayType';
import CertainDayHolidayType from '../../../src/components/holiday/types/CertainDayHolidayType';

describe('PublicHolidays', () => {
  // Read the holiday data from the JSON file for now. This data can be fetched from an API in the future.
  const filePath = 'resources\\holiday-data.json';
  const mockHolidays = JSON.parse(
    fs.readFileSync(path.resolve(filePath), 'utf-8')
  );

  const publicHolidays = new PublicHolidays();

  it('should add public holidays correctly', () => {
    publicHolidays.pushPublicHolidays(mockHolidays);

    const holidays = publicHolidays.getPublicHolidays();

    expect(holidays.length).toBe(8);
    expect(holidays[0] instanceof AdjustedHolidayType).toBeTruthy();
    expect(holidays[1] instanceof FixedHolidayType).toBeTruthy();
    expect(holidays[7] instanceof CertainDayHolidayType).toBeTruthy();
  });

  it('should return true if the date is a holiday', () => {
    const isFixedDayHoliday = publicHolidays.isHoliday(new Date('2023-01-26'));
    expect(isFixedDayHoliday).toBeTruthy();

    const isAdjustedHoliday = publicHolidays.isHoliday(new Date('2023-01-01'));
    expect(isAdjustedHoliday).toBeTruthy();

    const isCertainDayHoliday = publicHolidays.isHoliday(
      new Date('2023-10-02')
    );
    expect(isCertainDayHoliday).toBeTruthy();
  });

  it('should return false if the date is not a holiday', () => {
    const isFixedDayHoliday = publicHolidays.isHoliday(new Date('2023-01-27'));
    expect(isFixedDayHoliday).toBeFalsy();

    const isAdjustedHoliday = publicHolidays.isHoliday(new Date('2023-01-02'));
    expect(isAdjustedHoliday).toBeFalsy();

    const isCertainDayHoliday = publicHolidays.isHoliday(
      new Date('2023-10-03')
    );
    expect(isCertainDayHoliday).toBeFalsy();
  });
});
