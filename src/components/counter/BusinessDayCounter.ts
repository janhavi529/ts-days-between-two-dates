import fs from 'fs';
import path from 'path';

import appRootPath from 'app-root-path';

import { PublicHolidays } from '../holiday/PublicHolidays';

export default class BusinessDayCounter {
  /**
   * Calculate the number of weekdays between two dates.
   *
   * @param {Date} firstDate Start Date (Exclusive)
   * @param {Date} secondDate End Date (Exclusive)
   * @returns {Number} Number of weekdays
   */
  weekdaysBetweenTwoDates(firstDate: Date, secondDate: Date): number {
    let weekdays = 0;

    // If secondDate is equal to or before firstDate, return 0.
    if (secondDate <= firstDate) {
      return weekdays;
    }

    // Rather than looping over days between the two dates (higher time complexity), calculate the total number of days between the two dates and subtract the number of weekends.

    // Get the time difference in milliseconds between the two dates in order to calculate difference in days.
    const timeDifference = secondDate.getTime() - firstDate.getTime();
    const millisecondsPerDay = 1000 * 60 * 60 * 24;
    const totalExclusiveDays =
      Math.floor(timeDifference / millisecondsPerDay) - 1; // Subtract 1 to exclude the firstDate in the count.

    // Calculate the number of weekends within the total days.
    let weekends = Math.floor(totalExclusiveDays / 7) * 2; // Multiply number of weeks by 2 for Saturday and Sunday.

    const firstDay = firstDate.getDay();
    const secondDay = secondDate.getDay();

    // Adjust the weekends count if the range starts on a weekend.
    if (firstDay === 0) {
      weekends -= 1; // Exclude Sunday as a weekday.
    } else if (firstDay === 6) {
      weekends += 1; // Include Saturday as a weekday.
    }

    // Adjust the weekends count if the range ends on a weekend.
    if (secondDay === 6) {
      weekends -= 1; // Exclude Sunday as a weekday.
    } else if (secondDay === 0) {
      weekends += 1; // Include Sunday as a weekday.
    }

    // Calculate the number of weekdays
    weekdays = totalExclusiveDays - weekends;

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
    // If secondDate is equal to or before firstDate, return 0.
    if (secondDate <= firstDate) {
      return 0;
    }

    // Helper function to check if a given date is a weekend (Saturday or Sunday)
    // TODO: Move this outside and reuse for 1st function.
    const isWeekend = (date: Date): boolean => {
      const day = date.getDay();
      return day === 0 || day === 6;
    };

    // Calculate the total number of days between startDate and endDate (exclusive).
    const timeDifference = secondDate.getTime() - firstDate.getTime();
    const millisecondsPerDay = 1000 * 60 * 60 * 24;
    const totalExclusiveDays =
      Math.floor(timeDifference / millisecondsPerDay) - 1; // Subtract 1 to exclude the firstDate in the count.

    // Create a Set of holiday dates for faster lookup
    const holidaySet = new Set(
      publicHolidays.map(holiday => holiday.toDateString())
    );

    let businessDays = 0;

    // TODO: Change implementation a bit
    // Use a loop to iterate through the days and check for weekends and holidays
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

    // Helper function to check if a given date is a weekend (Saturday or Sunday)
    // TODO: Move this outside and reuse for 1st function.
    const isWeekend = (date: Date): boolean => {
      const day = date.getDay();
      return day === 0 || day === 6;
    };

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

    const publicHolidays = new PublicHolidays();
    publicHolidays.pushPublicHolidays(holidayData);
    console.log('publicHolidays:::::::', publicHolidays.getPublicHolidays());

    // TODO: Change implementation a bit
    // Use a loop to iterate through the days and check for weekends and holidays
    for (let i = 1; i <= totalExclusiveDays; i++) {
      const currentDate = new Date(firstDate);
      currentDate.setDate(firstDate.getDate() + i);

      if (!isWeekend(currentDate) && !publicHolidays.isHoliday(currentDate)) {
        businessDays++;
      }
    }

    return businessDays;
  }
}
