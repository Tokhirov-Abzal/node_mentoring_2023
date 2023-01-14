const fs = require('fs');
const path = require('path');
const csv = require('csvtojson');

const readStream = fs.createReadStream(path.join(__dirname, 'ex1.csv'));
const writeStream = fs.createWriteStream(path.join(__dirname, 'newCsv.csv'));

const handleError = err => {
  console.log(err);
  readStream.destroy();
  writeStream.end('Something went wrong!');
};

const parserOptions = {
  headers: ['book', 'author', 'amount', 'price'],
  colParser: {
    amount: 'omit',
  },
};

readStream
  .on('error', handleError)
  .pipe(csv(parserOptions).on('error', handleError))
  .pipe(writeStream);
