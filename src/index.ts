import BusinessDayCounter from './components/counter/BusinessDayCounter';

// TODO: Remove - only for testing
const firstDate = new Date('2023-12-20');
const secondDate = new Date('2024-01-05');

console.log('firstDate:', firstDate);
console.log('secondDate:', secondDate);

const counter = new BusinessDayCounter();

const weekdays = counter.weekdaysBetweenTwoDates(firstDate, secondDate);
const businessDays = counter.businessDaysBetweenTwoDatesUsingDS(
  firstDate,
  secondDate
);

console.log('weekdaysBetweenTwoDates:', weekdays);
console.log('businessDaysBetweenTwoDatesUsingDS:', businessDays);

// Exporting BusinessDayCounter functionality for use as an NPM package.
export default BusinessDayCounter;
