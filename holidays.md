# NSW public holidays 2023 to 2024

Holiday	        |   2023	                   |   2024
New Year's Day	|   Sunday 1 January 2023	   |   Monday 1 January 2024
Additional Day	|   Monday 2 January 2023	   |   Not applicable
Australia Day	|   Thursday 26 January 2023   |   Friday 26 January 2024
Good Friday	    |   Friday 7 April 2023	       |   Friday 29 March 2024
Easter Saturday	|   Saturday 8 April 2023	   |   Saturday 30 March 2024
Easter Sunday	|   Sunday 9 April 2023	       |   Sunday 31 March 2024
Easter Monday	|   Monday 10 April 2023	   |   Monday 1 April 2024
Anzac Day	    |   Tuesday 25 April 2023	   |   Thursday 25 April 2024
King's Birthday	|   Monday 12 June 2023	       |   Monday 10 June 2024
Bank Holiday	|   Monday 7 August 2023	   |   Monday 5 August 2024
Labour Day	    |   Monday 2 October 2023	   |   Monday 7 October 2024
Christmas Day	|   Monday 25 December 2023	   |   Wednesday 25 December 2024
Boxing Day	    |   Tuesday 26 December 2023   |   Thursday 26 December 2024

## Fixed Day Holidays (Adjusted to the following Monday if they fall on a weekend)
New Year's Day - 1 January
Australia Day - 26 January
Anzac Day - 25 April
Christmas Day - 25 December
Boxing Day - 26 December

## Certain Day Holidays
King's Birthday - Month: June, Day: Monday, Week: 2
Bank Holiday - Month: August, Day: Monday, Week: 1
Labour Day - Month: October, Day: Monday, Week: 1

## Special Cases
Good Friday, Easter Saturday, Easter Sunday, Easter Monday - Changes every year (TODO: Check algorithm)


### Class Structure
HolidayType
- FixedDayPublicHoliday
- AdjustedDayPublicHoliday
- CertainDayPublicHoliday

PublicHolidays -> Contains all HolidayType days