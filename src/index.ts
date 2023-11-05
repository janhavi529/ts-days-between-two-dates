import fs from 'fs';
import path from 'path';

import appRootPath from 'app-root-path';

import BusinessDayCounter from './components/counter/BusinessDayCounter';
import { getPublicHolidays } from './components/helpers/holiday';

const firstDate = new Date('2023-12-20');
const secondDate = new Date('2024-01-05');

console.log('firstDate:', firstDate);
console.log('secondDate:', secondDate);

// Read the holiday data from the JSON file for now. This data can be fetched from an API in the future.
const holidayData = JSON.parse(
  fs.readFileSync(
    path.join(appRootPath.toString(), 'resources', 'holiday-data.json'),
    'utf-8'
  )
);
const publicHolidays = getPublicHolidays(holidayData);

console.log('publicHolidays:', publicHolidays);

const counter = new BusinessDayCounter();

const weekdays = counter.weekdaysBetweenTwoDates(firstDate, secondDate);
const businessDays = counter.businessDaysBetweenTwoDatesWithHolidayInput(
  firstDate,
  secondDate
);

console.log('weekdaysBetweenTwoDates:', weekdays);
console.log('businessDaysBetweenTwoDatesWithHolidayInput:', businessDays);

// Exporting BusinessDayCounter functionality for use as an NPM package.
export default BusinessDayCounter;
