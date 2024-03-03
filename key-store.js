const VALID_KEYS_PATH = __dirname + '/valid-keys.txt';
const fs = require('fs/promises');
const shortid = require('shortid');
// To generate a unique API KEY, use shortid.generate()
const LINE_ENDING = require('os').EOL;

// here we could think about using a bloom filter
const uniqueApiKeys = new Set()

module.exports = async function (req, res) {
  const apiKey = shortid()
  uniqueApiKeys.add(apiKey)
  /**
   * TODO: Check if api key exists, and in that case generate a new one
   * Use setInmediate to avoid blocking the main thread, avoiding loops like while
   */

  await fs.writeFile(VALID_KEYS_PATH, `apiKey${LINE_ENDING}`)

  return res.status(201).send({
    apiKey
  })
};
