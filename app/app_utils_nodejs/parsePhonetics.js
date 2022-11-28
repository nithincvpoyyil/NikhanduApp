const fs = require('fs');
const {open} = fs.promises;

async function parse() {
  let inputFile = null;

  try {
    inputFile = await open('./olam-enml-phonetic.csv');
    const outputFileWS = fs.createWriteStream('olam-enml-phonetic.json');

    outputFileWS.once('open', async () => {
      outputFileWS.write('{');
      for await (const line of inputFile.readLines()) {
        const array = line.split(',');
        outputFileWS.write(`"${array[0].trim()}":"${array[1].trim()}",`);
      }
      outputFileWS.write('}');
      outputFileWS.end();
    });
  } catch (error) {
    throw new Error('error');
  }
}

parse();
