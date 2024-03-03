const fs = require('fs');
const readline = require('readline');

const VALID_KEYS_PATH = __dirname + '/valid-keys.txt';

/**
 * For the purpose of this test, we will check on every request the file VALID_KEYS_PATH
 * but this solution is not well performant. We should store them in memory (if we have just 1 machine), sharing
 * an unique set or bloom filter and if there are more than 1 machine then a solution like redis to cache the
 * valid api keys
 */
async function checkIfApiKeyExists(apiKey) {
  return new Promise((resolve) => {
    const rl = readline.createInterface({
      input: fs.createReadStream(VALID_KEYS_PATH),
      crlfDelay: Infinity
    });

    rl.on('line', (line) => {
      if (line ===  apiKey) {
        return resolve(true)
      }
    });

    rl.on('end', () => resolve(false))
  })
};

module.exports = function (req, res, next) {
  const apiKey = req.headers['x-api-key']

  if (!apiKey) {
    return res.status(401).send()
  }

  const apiKeyExists = checkIfApiKeyExists(apiKey)
  if (!apiKeyExists) {
    return res.status(401).send()
  }

  return next()
};
