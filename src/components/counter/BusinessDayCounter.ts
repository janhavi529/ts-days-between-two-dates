import fs from 'fs';
import path from 'path';

import appRootPath from 'app-root-path';

import { PublicHolidays } from '../holiday/PublicHolidays';
import { isWeekend } from '../utils/date';

export default class BusinessDayCounter {
  /**
   * Calculate the number of weekdays between two dates.
   *
   * @param {Date} firstDate Start Date (Exclusive)
   * @param {Date} secondDate End Date (Exclusive)
   * @returns {Number} Number of weekdays
   */
  weekdaysBetweenTwoDates(firstDate: Date, secondDate: Date): number {
    let weekdays = 0,
      weekends = 0;

    // If secondDate is equal to or before firstDate, return 0.
    if (secondDate <= firstDate) {
      return weekdays;
    }

    // Rather than looping over days between the two dates (higher time complexity), calculate the total number of days between the two dates and subtract the number of weekends.
    const timeDifference = secondDate.getTime() - firstDate.getTime();
    const millisecondsPerDay = 1000 * 60 * 60 * 24;
    const totalInclusiveDays =
      Math.floor(timeDifference / millisecondsPerDay) + 1;

    const completeWeeks = Math.floor(totalInclusiveDays / 7);

    const firstDay = firstDate.getDay();
    const secondDay = secondDate.getDay();

    if (completeWeeks > 0) {
      // Calculate the number of weekend days within the total days. This is for all scenarios without remaining days (exact weeks).
      weekends = completeWeeks * 2;

      // Calculate additional weekends if the remaining days include a weekend.
      const remainingDays = totalInclusiveDays % 7;

      if (remainingDays > 0) {
        // Check if the first day and last day fall on weekends and adjust weekend days count.
        if (firstDay !== 0 && firstDay <= 6 && firstDay >= remainingDays) {
          weekends++;
        }

        if (
          secondDay !== 0 &&
          secondDay <= 6 &&
          secondDay > 7 - remainingDays
        ) {
          weekends++;
        }
      }
    } else {
      // If the first day is Saturday or the second day is Sunday, then weekends = 2.
      if (firstDay === 6 || secondDay === 0) {
        weekends = 1; // As the firstDay/secondDay is excluded in the count below, we only need to add 1.
      }
    }

    weekdays = totalInclusiveDays - weekends - 2; // Subtract 2 to exclude the firstDate and secondDate in the count.

    return weekdays;
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
    // If secondDate is equal to or before firstDate, return 0.
    if (secondDate <= firstDate) {
      return 0;
    }

    // Calculate the total number of days between startDate and endDate (exclusive).
    const timeDifference = secondDate.getTime() - firstDate.getTime();
    const millisecondsPerDay = 1000 * 60 * 60 * 24;
    const totalExclusiveDays =
      Math.floor(timeDifference / millisecondsPerDay) - 1; // Subtract 1 to exclude the firstDate in the count.

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
  }
}
