export class BusinessDayCounterError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'BusinessDayCounterError';
    Error.captureStackTrace(this, BusinessDayCounterError);
  }
}

export class WeekDayCounterError extends BusinessDayCounterError {
  constructor(message: string) {
    super(message);
    this.name = 'WeekDayCounterError';
    Error.captureStackTrace(this, WeekDayCounterError);
  }
}

export class DatesBusinessDayCounterError extends BusinessDayCounterError {
  constructor(message: string) {
    super(message);
    this.name = 'DatesBusinessDayCounterError';
    Error.captureStackTrace(this, DatesBusinessDayCounterError);
  }
}

export class HolidaysBusinessDayCounterError extends BusinessDayCounterError {
  constructor(message: string) {
    super(message);
    this.name = 'HolidaysBusinessDayCounterError';
    Error.captureStackTrace(this, HolidaysBusinessDayCounterError);
  }
}
