import BusinessDayCounter from '../../src/components/counter/BusinessDayCounter';

describe('BusinessDayCounter', () => {
  describe('weekdaysBetweenTwoDates method', () => {
    it('should return the correct number of weekdays between two dates', () => {
      const businessDayCounter = new BusinessDayCounter();
      const testDateScenarios = [
        {
          firstDate: new Date('2013-10-05'),
          secondDate: new Date('2013-10-14')
        },
        {
          firstDate: new Date('2013-10-07'),
          secondDate: new Date('2013-10-09')
        },
        {
          firstDate: new Date('2013-10-07'),
          secondDate: new Date('2014-01-01')
        }
      ];
      const testExpectedOutputs = [5, 1, 61];

      testDateScenarios.forEach(({ firstDate, secondDate }, index) => {
        const result = businessDayCounter.weekdaysBetweenTwoDates(
          firstDate,
          secondDate
        );
        expect(result).toBe(testExpectedOutputs[index]);
      });
    });

    it('should return 0 if the end date is before or equal to the start date', () => {
      const businessDayCounter = new BusinessDayCounter();
      const testDateScenarios = [
        {
          firstDate: new Date('2013-10-07'),
          secondDate: new Date('2013-10-05')
        },
        {
          firstDate: new Date('2013-10-07'),
          secondDate: new Date('2013-10-07')
        }
      ];
      const testExpectedOutputs = [0, 0];

      testDateScenarios.forEach(({ firstDate, secondDate }, index) => {
        const result = businessDayCounter.weekdaysBetweenTwoDates(
          firstDate,
          secondDate
        );
        expect(result).toBe(testExpectedOutputs[index]);
      });
    });
  });

  describe('businessDaysBetweenTwoDates method', () => {
    const publicHolidays = [
      new Date('2013-12-25'),
      new Date('2013-12-26'),
      new Date('2014-01-01')
    ];

    it('should return the correct number of business days between two dates excluding holidays and weekends', () => {
      const businessDayCounter = new BusinessDayCounter();

      const testDateScenarios = [
        {
          firstDate: new Date('2013-10-07'),
          secondDate: new Date('2013-10-09')
        },
        {
          firstDate: new Date('2013-12-24'),
          secondDate: new Date('2013-12-27')
        },
        {
          firstDate: new Date('2013-10-07'),
          secondDate: new Date('2014-01-01')
        }
      ];
      const testExpectedOutputs = [1, 0, 59];

      testDateScenarios.forEach(({ firstDate, secondDate }, index) => {
        const result = businessDayCounter.businessDaysBetweenTwoDates(
          firstDate,
          secondDate,
          publicHolidays
        );
        expect(result).toBe(testExpectedOutputs[index]);
      });
    });

    it('should return 0 if the end date is before or equal to the start date', () => {
      const businessDayCounter = new BusinessDayCounter();
      const testDateScenarios = [
        {
          firstDate: new Date('2013-10-07'),
          secondDate: new Date('2013-10-05')
        },
        {
          firstDate: new Date('2013-10-07'),
          secondDate: new Date('2013-10-07')
        }
      ];
      const testExpectedOutputs = [0, 0];

      testDateScenarios.forEach(({ firstDate, secondDate }, index) => {
        const result = businessDayCounter.businessDaysBetweenTwoDates(
          firstDate,
          secondDate,
          publicHolidays
        );
        expect(result).toBe(testExpectedOutputs[index]);
      });
    });
  });
});
