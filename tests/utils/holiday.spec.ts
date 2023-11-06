import { getHolidayData } from '../../src/utils/holiday';

describe('getHolidayData function', () => {
  it('should read holiday data from the JSON file', () => {
    const mockHolidayData = [
      { date: 1, month: 1, name: "New Year's Day", type: 'AdjustedDay' },
      { date: 26, month: 1, name: 'Australia Day', type: 'FixedDay' },
      { date: 25, month: 4, name: 'Anzac Day', type: 'FixedDay' },
      { date: 25, month: 12, name: 'Christmas Day', type: 'FixedDay' },
      { date: 26, month: 12, name: 'Boxing Day', type: 'FixedDay' },
      {
        day: 1,
        month: 6,
        name: "King's Birthday",
        type: 'CertainDay',
        week: 2
      },
      { day: 1, month: 8, name: 'Bank Holiday', type: 'CertainDay', week: 1 },
      { day: 1, month: 10, name: 'Labour Day', type: 'CertainDay', week: 1 }
    ];

    const holidayData = getHolidayData();

    expect(holidayData).toEqual(mockHolidayData);
  });
});
