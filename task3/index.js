import { stdin, stdout } from 'node:process';

import fs from 'fs';
import path from 'path';
import csv from 'csvtojson';

// Task1

stdin.on('data', data => {
  const preparedData = data.toString().trim().split('').reverse().join('');

  stdout.write(`${preparedData} \n`);
});

// Task2
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
