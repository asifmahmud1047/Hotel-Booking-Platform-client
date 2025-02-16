import moment from "moment";

/**
 * Formats a date to display format
 * @param {Date|string} date - Date to format
 * @returns {string} Formatted date string
 */
export const formatDate = (date) => {
  return moment(date).format("MMMM D, YYYY");
};

/**
 * Checks if a date is in the past
 * @param {Date|string} date - Date to check
 * @returns {boolean} True if date is in the past
 */
export const isPastDate = (date) => {
  return moment(date).isBefore(moment(), "day");
};

/**
 * Checks if a date is within the cancellation period (1 day before booking)
 * @param {Date|string} bookingDate - The date of the booking
 * @returns {boolean} True if the booking can still be cancelled
 */
export const isWithinCancellationPeriod = (bookingDate) => {
  const cancellationDeadline = moment(bookingDate).subtract(1, "days");
  return moment().isBefore(cancellationDeadline);
};

/**
 * Calculates the number of days between two dates
 * @param {Date|string} startDate - Start date
 * @param {Date|string} endDate - End date
 * @returns {number} Number of days between dates
 */
export const calculateDaysBetween = (startDate, endDate) => {
  return moment(endDate).diff(moment(startDate), "days");
};

/**
 * Formats a date range for display
 * @param {Date|string} startDate - Start date
 * @param {Date|string} endDate - End date
 * @returns {string} Formatted date range
 */
export const formatDateRange = (startDate, endDate) => {
  const start = moment(startDate).format("MMM D");
  const end = moment(endDate).format("MMM D, YYYY");
  return `${start} - ${end}`;
};

/**
 * Gets an array of dates between start and end dates
 * @param {Date|string} startDate - Start date
 * @param {Date|string} endDate - End date
 * @returns {Array<string>} Array of dates in YYYY-MM-DD format
 */
export const getDatesBetween = (startDate, endDate) => {
  const dates = [];
  let currentDate = moment(startDate);
  const lastDate = moment(endDate);

  while (currentDate <= lastDate) {
    dates.push(currentDate.format("YYYY-MM-DD"));
    currentDate = currentDate.add(1, "days");
  }

  return dates;
};

/**
 * Validates if a date is available for booking
 * @param {Date|string} date - Date to check
 * @param {Array<string>} bookedDates - Array of already booked dates
 * @returns {boolean} True if date is available
 */
export const isDateAvailable = (date, bookedDates) => {
  const formattedDate = moment(date).format("YYYY-MM-DD");
  return !bookedDates.includes(formattedDate);
};

/**
 * Gets disabled dates for date picker (past dates and booked dates)
 * @param {Array<string>} bookedDates - Array of booked dates
 * @returns {Array<Date>} Array of disabled dates
 */
export const getDisabledDates = (bookedDates) => {
  const today = moment().startOf("day");

  // Convert booked dates to Date objects
  const disabledDates = bookedDates.map((date) => moment(date).toDate());

  // Add all past dates
  let currentDate = moment().startOf("day");
  while (currentDate.isBefore(today)) {
    disabledDates.push(currentDate.toDate());
    currentDate = currentDate.add(1, "days");
  }

  return disabledDates;
};

/**
 * Formats a time duration for display
 * @param {number} minutes - Duration in minutes
 * @returns {string} Formatted duration string
 */
export const formatDuration = (minutes) => {
  const duration = moment.duration(minutes, "minutes");
  const hours = Math.floor(duration.asHours());
  const mins = duration.minutes();

  if (hours === 0) {
    return `${mins}m`;
  }

  return mins === 0 ? `${hours}h` : `${hours}h ${mins}m`;
};
