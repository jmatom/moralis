const VALID_KEYS_PATH = __dirname + '/valid-keys.txt';
const fs = require('fs/promises');
const shortid = require('shortid');
// To generate a unique API KEY, use shortid.generate()
const LINE_ENDING = require('os').EOL;

// here we could think about using a bloom filter
const uniqueApiKeys = new Set()

async function generateUniqueApiKey() {
  let created = false
  let apiKey
  while (created === false) {
    apiKey = shortid()
    if (!uniqueApiKeys.has(apiKey)) {
      uniqueApiKeys.add(apiKey)
      await fs.writeFile(VALID_KEYS_PATH, `${apiKey}${LINE_ENDING}`, { flag: 'a+' })
      created = true
    }
  }

  return apiKey
}

module.exports = async function (req, res) {
  const apiKey = await generateUniqueApiKey()
  return res.status(201).send({
    apiKey
  })
};
