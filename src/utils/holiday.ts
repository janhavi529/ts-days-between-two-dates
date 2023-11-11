import fs from 'fs';
import path from 'path';

/**
 * Helper function to get holiday JSON data.
 *
 * @returns {Array} Holiday data from JSON file.
 */
const getHolidayData = (): Array<object> => {
  // Read the holiday data from the JSON file for now. This data can be fetched from an API in the future.
  const filePath = 'resources\\holiday-data.json';
  const holidayData = JSON.parse(
    fs.readFileSync(path.resolve(filePath), 'utf-8')
  );

  return holidayData;
};

export { getHolidayData };
