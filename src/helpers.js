const moment = require('moment-timezone');
const { DATE_FORMAT, TIMEZONE, YELLOW_CONSOLE_LOG } = require('./constants.js');

/**
 *
 * @param {Date} - Date to be converted to ISO-8601
 * @returns {String} - ISO-8601 formatted Date (NOTE: .format() omits milliseconds and maintains timezone offet, .toISOString() keeps milliseconds and is in UTC. Both fulfill ISO-8601 requirements)
 */
const formatISO8601 = date =>
  moment.tz(date, DATE_FORMAT, TIMEZONE.EST).format();

const formatTime = duration => {
  const [hours, minutes, seconds] = duration.split(':');
  return [hours, minutes, Math.trunc(seconds)].join(':');
};

const getTimeConfig = durationObj => ({
  hours: String(durationObj.hours()).padStart(2, 0),
  minutes: String(durationObj.minutes()).padStart(2, 0),
  seconds: String(durationObj.seconds()).padStart(2, 0),
});

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
