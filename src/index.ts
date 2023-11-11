import BusinessDayCounter from './components/counter/BusinessDayCounter';

const firstDate = new Date('2023-12-21');
const secondDate = new Date('2024-01-03');

const businessDayCounter = new BusinessDayCounter();

// Task 1
const weekdaysBetweenTwoDates = businessDayCounter.weekdaysBetweenTwoDates(
  firstDate,
  secondDate
);

console.log('weekdaysBetweenTwoDates:', weekdaysBetweenTwoDates);

// Task 2
const publicHolidays = [
  new Date('2023-12-25'),
  new Date('2023-12-26'),
  new Date('2024-01-01')
];

const businessDaysBetweenTwoDates =
  businessDayCounter.businessDaysBetweenTwoDates(
    firstDate,
    secondDate,
    publicHolidays
  );

console.log('businessDaysBetweenTwoDates:', businessDaysBetweenTwoDates);

// Task 3
const businessDaysBetweenTwoDatesUsingDS =
  businessDayCounter.businessDaysBetweenTwoDatesUsingDS(firstDate, secondDate);

console.log(
  'businessDaysBetweenTwoDatesUsingDS:',
  businessDaysBetweenTwoDatesUsingDS
);

// Exporting BusinessDayCounter functionality for use as an NPM package.
export default BusinessDayCounter;
