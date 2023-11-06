import AdjustedHolidayType from '../../../../src/components/holiday/types/AdjustedHolidayType';

describe('AdjustedHolidayType', () => {
  const adjustedHolidayType = new AdjustedHolidayType(1, 1);

  it('should correctly check a adjusted holiday date', () => {
    const date = new Date('2023-01-01');

    expect(adjustedHolidayType.isHoliday(date)).toBeTruthy();
  });

  it('should return false if the date is not a fixed holiday', () => {
    const date = new Date('2020-01-01');
    const date2 = new Date('2020-02-05');

    expect(adjustedHolidayType.isHoliday(date)).toBeFalsy();
    expect(adjustedHolidayType.isHoliday(date2)).toBeFalsy();
  });
});
