import fs from 'fs';
import path from 'path';

import appRootPath from 'app-root-path';

import PublicHolidays from '../holiday/PublicHolidays';
import { isWeekend, isWeekendDay } from '../../utils/date';
import {
  DatesBusinessDayCounterError,
  HolidaysBusinessDayCounterError,
  WeekDayCounterError
} from '../../errors/BusinessDayCounterErrors';

export default class BusinessDayCounter {
  /**
   * Calculate the number of weekdays between two dates.
   *
   * @param {Date} firstDate Start Date (Exclusive)
   * @param {Date} secondDate End Date (Exclusive)
   * @returns {Number} Number of weekdays
   */
  weekdaysBetweenTwoDates(firstDate: Date, secondDate: Date): number {
    try {
      let weekdays = 0,
        weekends = 0,
        excludedDays = 0;

      // Rather than looping over days between the two dates (higher time complexity), calculate the total number of days between the two dates and subtract the number of weekends.
      const timeDifference = secondDate.getTime() - firstDate.getTime();
      const millisecondsPerDay = 1000 * 60 * 60 * 24;
      const totalInclusiveDays =
        Math.floor(timeDifference / millisecondsPerDay) + 1;

      console.log('totalInclusiveDays', totalInclusiveDays);
      // If secondDate is equal to or before firstDate or if there are no days between the two dates, return 0.
      if (secondDate <= firstDate || totalInclusiveDays <= 2) {
        return weekdays;
      }

      const firstDay = firstDate.getDay();
      const secondDay = secondDate.getDay();

      const completeWeeks = Math.floor(totalInclusiveDays / 7);
      const remainingDays = totalInclusiveDays % 7;

      // TODO: Optimise
      // For each scenario, calculate the number of weekends and excluded days.
      if (completeWeeks > 0) {
        if (remainingDays === 0) {
          if (firstDay === 6 || secondDay === 0) {
            weekends = 2 * completeWeeks;
            excludedDays = 1;
          } else if (firstDay === 0 || secondDay === 6) {
            weekends = 2 * completeWeeks;
            excludedDays = 0;
          } else {
            weekends = 2 * completeWeeks;
            excludedDays = 2;
          }
        } else {
          if (firstDay === secondDay && isWeekendDay(firstDay)) {
            weekends = 2 * completeWeeks + 1;
            excludedDays = 0;
          } else if (firstDay === 0 && secondDay === 6) {
            weekends = 2 * completeWeeks + 1;
            excludedDays = 0;
          } else if (firstDay === 6 && secondDay === 0) {
            weekends = 2 * completeWeeks + 2;
            excludedDays = 0;
          } else if (
            (firstDay === 6 && !isWeekendDay(secondDay)) ||
            (secondDay === 0 && !isWeekendDay(firstDay))
          ) {
            weekends = 2 * completeWeeks + 2;
            excludedDays = 1;
          } else if (
            (firstDay === 0 && !isWeekendDay(secondDay)) ||
            (secondDay === 6 && !isWeekendDay(firstDay))
          ) {
            weekends = 2 * completeWeeks + 1;
            excludedDays = 1;
          } else if (!isWeekendDay(firstDay) && !isWeekendDay(secondDay)) {
            weekends = 2 * completeWeeks;
            excludedDays = 2;
          }
        }
      } else {
        if (firstDay === 6 || secondDay === 0) {
          weekends = 2;
          excludedDays = 1;
        } else if (firstDay === 0 || secondDay === 6) {
          weekends = 1;
          excludedDays = 1;
        } else {
          weekends = 0;
          excludedDays = 2;
        }
      }

      weekdays = totalInclusiveDays - weekends - excludedDays;

      return weekdays;
    } catch (err: any) {
      throw new WeekDayCounterError(
        err.message || 'Unable to get weekdays between two dates'
      );
    }
  }

  /**
   * Calculate the number of business days between two dates (Weekdays minus Public Holidays).
   *
   * @param {Date} firstDate Start Date (Exclusive)
   * @param {Date} secondDate End Date (Exclusive)
   * @returns {Number} Number of weekdays
   */
  businessDaysBetweenTwoDates(
    firstDate: Date,
    secondDate: Date,
    publicHolidays: Date[]
  ): number {
    try {
      if (secondDate <= firstDate) {
        return 0;
      }

      // Calculate the total number of days between startDate and endDate (exclusive).
      const timeDifference = secondDate.getTime() - firstDate.getTime();
      const millisecondsPerDay = 1000 * 60 * 60 * 24;
      const totalExclusiveDays =
        Math.floor(timeDifference / millisecondsPerDay) - 1; // Subtract 1 to exclude the firstDate in the count.

      // Create a Set of holiday dates for faster lookup.
      const holidaySet = new Set(
        publicHolidays.map(holiday => holiday.toDateString())
      );

      let businessDays = 0;

      // Use a loop to iterate through the days and check for weekends and holidays.
      for (let i = 1; i <= totalExclusiveDays; i++) {
        const currentDate = new Date(firstDate);
        currentDate.setDate(firstDate.getDate() + i);
        if (
          !isWeekend(currentDate) &&
          !holidaySet.has(currentDate.toDateString())
        ) {
          businessDays++;
        }
      }

      return businessDays;
    } catch (err: any) {
      throw new DatesBusinessDayCounterError(
        err.message || 'Unable to get business days between two dates'
      );
    }
  }

  /**
   * Calculate the number of business days between two dates (Weekdays minus Public Holidays).
   *
   * @param {Date} firstDate Start Date (Exclusive)
   * @param {Date} secondDate End Date (Exclusive)
   * @returns {Number} Number of weekdays
   */
  businessDaysBetweenTwoDatesUsingDS(
    firstDate: Date,
    secondDate: Date
  ): number {
    try {
      // If secondDate is equal to or before firstDate, return 0.
      if (secondDate <= firstDate) {
        return 0;
      }

      // Calculate the total number of days between startDate and endDate (exclusive).
      const timeDifference = secondDate.getTime() - firstDate.getTime();
      const millisecondsPerDay = 1000 * 60 * 60 * 24;
      const totalExclusiveDays =
        Math.floor(timeDifference / millisecondsPerDay) - 1;

      let businessDays = 0;

      // Read the holiday data from the JSON file for now. This data can be fetched from an API in the future.
      const holidayData = JSON.parse(
        fs.readFileSync(
          path.join(appRootPath.toString(), 'resources', 'holiday-data.json'),
          'utf-8'
        )
      );

      // Push public holidays to the data structure.
      const publicHolidays = new PublicHolidays();
      publicHolidays.pushPublicHolidays(holidayData);

      // Use a loop to iterate through the days and check for weekends and holidays
      for (let i = 1; i <= totalExclusiveDays; i++) {
        const currentDate = new Date(firstDate);
        currentDate.setDate(firstDate.getDate() + i);

        // If the current date is not a weekend and not a holiday, increment businessDays.
        if (!isWeekend(currentDate) && !publicHolidays.isHoliday(currentDate)) {
          businessDays++;
        }
      }

      return businessDays;
    } catch (err: any) {
      throw new HolidaysBusinessDayCounterError(
        err.message ||
          'Unable to get business days between two dates while checking holiday types'
      );
    }
  }
}
