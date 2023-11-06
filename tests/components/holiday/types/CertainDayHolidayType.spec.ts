import CertainDayHolidayType from '../../../../src/components/holiday/types/CertainDayHolidayType';

describe('CertainDayHolidayType', () => {
  const certainDayHolidayType = new CertainDayHolidayType(6, 1, 2);

  it('should correctly check a adjusted holiday date', () => {
    const date = new Date('2023-06-12');

    expect(certainDayHolidayType.isHoliday(date)).toBeTruthy();
  });

  it('should return false if the date is not a adjusted holiday', () => {
    const date = new Date('2020-01-01');

    expect(certainDayHolidayType.isHoliday(date)).toBeFalsy();
  });
});
