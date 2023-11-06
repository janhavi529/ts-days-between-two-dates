import { isWeekend, isWeekendDay } from '../../src/utils/date';

describe('isWeekend function', () => {
  it('should return true for weekends', () => {
    const saturday = new Date('2023-04-01');
    const sunday = new Date('2023-04-02');

    expect(isWeekend(saturday)).toBeTruthy();
    expect(isWeekend(sunday)).toBeTruthy();
  });

  it('should return false for weekdays', () => {
    const monday = new Date('2023-04-03');
    const tuesday = new Date('2023-04-04');
    const wednesday = new Date('2023-04-05');
    const thursday = new Date('2023-04-06');
    const friday = new Date('2023-04-07');

    expect(isWeekend(monday)).toBeFalsy();
    expect(isWeekend(tuesday)).toBeFalsy();
    expect(isWeekend(wednesday)).toBeFalsy();
    expect(isWeekend(thursday)).toBeFalsy();
    expect(isWeekend(friday)).toBeFalsy();
  });
});

describe('isWeekendDay function', () => {
  it('should return true for weekends', () => {
    expect(isWeekendDay(0)).toBeTruthy();
    expect(isWeekendDay(6)).toBeTruthy();
  });

  it('should return false for weekdays', () => {
    expect(isWeekendDay(1)).toBeFalsy();
    expect(isWeekendDay(2)).toBeFalsy();
    expect(isWeekendDay(3)).toBeFalsy();
    expect(isWeekendDay(4)).toBeFalsy();
    expect(isWeekendDay(5)).toBeFalsy();
  });
});
