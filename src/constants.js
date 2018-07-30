const DATE_FORMAT = 'MM/DD/YY hh:mm:ss A';
const TIMEZONE = {
  EST: 'America/New_York',
};

const headers = [
  'Timestamp',
  'FullName',
  'ZIP',
  'FooDuration',
  'BarDuration',
  'Notes',
];

const YELLOW_CONSOLE_LOG = '\x1b[33m%s\x1b[0m';

module.exports = {
  DATE_FORMAT,
  headers,
  TIMEZONE,
  YELLOW_CONSOLE_LOG,
};
