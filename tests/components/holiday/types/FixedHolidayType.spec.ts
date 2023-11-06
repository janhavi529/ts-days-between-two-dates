import FixedHolidayType from '../../../../src/components/holiday/types/FixedHolidayType';

describe('FixedHolidayType', () => {
  const fixedHolidayType = new FixedHolidayType(4, 25);

  it('should correctly check a fixed holiday date', () => {
    const date = new Date('2023-04-25');

    expect(fixedHolidayType.isHoliday(date)).toBeTruthy();
  });

  it('should return false if the date is not a fixed holiday', () => {
    const date = new Date('2023-06-25');

    expect(fixedHolidayType.isHoliday(date)).toBeFalsy();
  });
});
