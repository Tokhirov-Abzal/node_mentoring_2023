const { stdin, stdout } = require('node:process');

stdin.on('data', data => {
  const preparedData = data.toString().trim().split('').reverse().join('');

  stdout.write(`${preparedData} \n`);
});
