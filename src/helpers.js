const moment = require('moment-timezone');
const { DATE_FORMAT, TIMEZONE, YELLOW_CONSOLE_LOG } = require('./constants.js');

/**
 * @param {Date} - Date to be converted to ISO-8601
 * @returns {String} - ISO-8601 formatted Date (NOTE: .format() omits milliseconds and maintains timezone offet, .toISOString() keeps milliseconds and is in UTC. Both fulfill ISO-8601 requirements)
 */
const formatISO8601 = date =>
  moment.tz(date, DATE_FORMAT, TIMEZONE.EST).format();

/**
 * @param {String} duration - Time in hh:mm:ss.ms format
 * @returns {String} - Time in hh:mm:ss format with MS removed
 */
const formatTime = duration => {
  const [hours, minutes, seconds] = duration.split(':');
  return [hours, minutes, Math.trunc(seconds)].join(':');
};

/**
 * @param {Object} - Duration object which contains methods to get the time
 * @returns {Object} - Duration metadata which pads the values if its a single value instead of 2 values (ex. 2 => 02)
 */
const getTimeConfig = durationObj => ({
  hours: String(durationObj.hours()).padStart(2, 0),
  minutes: String(durationObj.minutes()).padStart(2, 0),
  seconds: String(durationObj.seconds()).padStart(2, 0),
});

/**
 * @param {Array<String>} - A collection of durations
 * @returns {String} - Duration string after all durations are accumulated
 */
const addDurations = (...durations) =>
  [...durations].reduce((accum, curr) => {
    const { hours, minutes, seconds } = getTimeConfig(
      moment.duration(accum).add(curr),
    );
    return `${hours}:${minutes}:${seconds}`;
  }, '00:00:00');

const coloredConsoleLog = (msg, color = YELLOW_CONSOLE_LOG) =>
  console.log(color, msg);

module.exports = {
  addDurations,
  coloredConsoleLog,
  formatTime,
  formatISO8601,
};
