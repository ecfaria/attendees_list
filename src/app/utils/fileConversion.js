const fs = require('fs');
const path = require('path');
const readline = require('readline');

const txtToJson = async file => {
  return new Promise((resolve, reject) => {
    if (path.extname(file) !== '.txt')
      return reject({ error: 'Invalid file format' });

    const array = [];

    const stream = fs.createReadStream(file);
    stream.on('error', reject);

    const reader = readline.createInterface({
      input: stream
    });

    reader.on('line', line => {
      try {
        array.push(JSON.parse(line));
      } catch (e) {
        return reject({ error: 'The file is invalid or is corrupted' });
      }
    });

    reader.on('close', () => resolve(array));
  });
};

const stringToTxt = (filename, data, directory = process.env.OUTPUT_DIR) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(`${directory}/${filename}.txt`, data, err => {
      if (err) reject({ error: 'There was an error writing to file' });
      resolve({ message: 'Your file has been saved succesfully' });
    });
  });
};

module.exports = {
  txtToJson,
  stringToTxt
};
