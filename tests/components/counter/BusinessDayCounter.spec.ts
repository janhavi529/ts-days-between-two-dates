import BusinessDayCounter from '../../../src/components/counter/BusinessDayCounter';

describe('BusinessDayCounter', () => {
  describe('weekdaysBetweenTwoDates method', () => {
    it('should return the correct number of weekdays between two dates', () => {
      // Standard cases given in the problem statement.
      const businessDayCounter = new BusinessDayCounter();

      const testDateScenarios = [
        {
          firstDate: new Date('2013-10-07'),
          secondDate: new Date('2013-10-09')
        },
        {
          firstDate: new Date('2013-10-05'),
          secondDate: new Date('2013-10-14')
        },
        {
          firstDate: new Date('2013-10-07'),
          secondDate: new Date('2014-01-01')
        },
        {
          firstDate: new Date('2013-10-07'),
          secondDate: new Date('2013-10-05')
        }
      ];

      const testExpectedOutputs = [1, 5, 61, 0];

      testDateScenarios.forEach(({ firstDate, secondDate }, index) => {
        const result = businessDayCounter.weekdaysBetweenTwoDates(
          firstDate,
          secondDate
        );
        expect(result).toBe(testExpectedOutputs[index]);
      });
    });

    it('should return the correct number of weekdays between two dates when completeWeeks = 0', () => {
      const businessDayCounter = new BusinessDayCounter();

      const testDateScenarios = [
        {
          firstDate: new Date('2023-11-05'),
          secondDate: new Date('2023-11-09')
        },
        {
          firstDate: new Date('2023-11-04'),
          secondDate: new Date('2023-11-09')
        },
        {
          firstDate: new Date('2023-11-06'),
          secondDate: new Date('2023-11-11')
        },
        {
          firstDate: new Date('2023-11-07'),
          secondDate: new Date('2023-11-12')
        }
      ];

      const testExpectedOutputs = [3, 3, 4, 3];

      testDateScenarios.forEach(({ firstDate, secondDate }, index) => {
        const result = businessDayCounter.weekdaysBetweenTwoDates(
          firstDate,
          secondDate
        );
        expect(result).toBe(testExpectedOutputs[index]);
      });
    });

    it('should return the correct number of weekdays between two dates when completeWeeks > 0 and remainingDays = 0', () => {
      const businessDayCounter = new BusinessDayCounter();

      const testDateScenarios = [
        {
          firstDate: new Date('2023-11-04'),
          secondDate: new Date('2023-11-10')
        },
        {
          firstDate: new Date('2023-11-06'),
          secondDate: new Date('2023-11-12')
        },
        {
          firstDate: new Date('2023-11-05'),
          secondDate: new Date('2023-11-11')
        }
      ];

      const testExpectedOutputs = [4, 4, 5];

      testDateScenarios.forEach(({ firstDate, secondDate }, index) => {
        const result = businessDayCounter.weekdaysBetweenTwoDates(
          firstDate,
          secondDate
        );
        expect(result).toBe(testExpectedOutputs[index]);
      });
    });

    it('should return the correct number of weekdays between two dates when completeWeeks > 0 and remainingDays > 0', () => {
      const businessDayCounter = new BusinessDayCounter();

      const testDateScenarios = [
        {
          firstDate: new Date('2023-11-04'),
          secondDate: new Date('2023-11-18')
        },
        {
          firstDate: new Date('2023-11-05'),
          secondDate: new Date('2023-11-12')
        },
        {
          firstDate: new Date('2023-11-04'),
          secondDate: new Date('2023-11-19')
        },
        {
          firstDate: new Date('2023-11-05'),
          secondDate: new Date('2023-11-18')
        },
        {
          firstDate: new Date('2023-11-04'),
          secondDate: new Date('2023-11-14')
        },
        {
          firstDate: new Date('2023-11-06'),
          secondDate: new Date('2023-11-19')
        },
        {
          firstDate: new Date('2023-11-05'),
          secondDate: new Date('2023-11-15')
        },
        {
          firstDate: new Date('2023-11-08'),
          secondDate: new Date('2023-11-21')
        }
      ];

      const testExpectedOutputs = [10, 5, 10, 10, 6, 9, 7, 8];

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
        },
        {
          firstDate: new Date('2013-10-07'),
          secondDate: new Date('2013-10-08')
        }
      ];
      const testExpectedOutputs = [0, 0, 0];

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

  describe('businessDaysBetweenTwoDatesUsingDS method', () => {
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
        },
        {
          firstDate: new Date('2023-12-23'),
          secondDate: new Date('2023-12-28')
        },
        {
          firstDate: new Date('2023-06-10'),
          secondDate: new Date('2023-06-14')
        }
        // {
        //   firstDate: new Date('2022-12-28'),
        //   secondDate: new Date('2023-01-03')
        // }
      ];
      const testExpectedOutputs = [
        1, 0, 59, 1, 1
        // , 2
      ];

      testDateScenarios.forEach(({ firstDate, secondDate }, index) => {
        const result = businessDayCounter.businessDaysBetweenTwoDatesUsingDS(
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
        const result = businessDayCounter.businessDaysBetweenTwoDatesUsingDS(
          firstDate,
          secondDate
        );
        expect(result).toBe(testExpectedOutputs[index]);
      });
    });
  });
});
