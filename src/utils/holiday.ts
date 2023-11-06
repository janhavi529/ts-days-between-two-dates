import fs from 'fs';
import path from 'path';

import appRootPath from 'app-root-path';

/**
 * Helper function to get holiday JSON data.
 *
 * @returns {Array} Holiday data from JSON file.
 */
const getHolidayData = (): Array<object> => {
  // Read the holiday data from the JSON file for now. This data can be fetched from an API in the future.
  const holidayData = JSON.parse(
    fs.readFileSync(
      path.join(appRootPath.toString(), 'resources', 'holiday-data.json'),
      'utf-8'
    )
  );

  return holidayData;
};

export { getHolidayData };
