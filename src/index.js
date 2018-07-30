const fs = require('fs');
const csv = require('csv-parser');
const { headers } = require('./constants.js');
const {
  formatISO8601,
  formatTime,
  addDurations,
  coloredConsoleLog,
} = require('./helpers.js');

const csvFile = process.argv[2];

if (!csvFile) {
  throw new Error(
    'Please provide a CSV file to parse in the following way: npm run normalize -- sample.csv',
  );
}

let showHeaders = true;

fs.createReadStream(csvFile)
  .pipe(csv())
  .on(
    'data',
    ({ Timestamp, FullName, ZIP, FooDuration, BarDuration, Notes }) => {
      if (showHeaders) {
        console.log(headers.join(','));
        showHeaders = false;
      }
      const output = [
        formatISO8601(Timestamp),
        FullName.toUpperCase(),
        ZIP.padStart(5, 0),
        formatTime(FooDuration),
        formatTime(BarDuration),
        addDurations(FooDuration, BarDuration),
        Notes,
      ];
      console.log(output.join(','));
    },
  )
  .on('end', function() {
    coloredConsoleLog('Normalized output complete');
  });
