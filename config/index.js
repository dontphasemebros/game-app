// require cloud storage service via google
const { Storage } = require('@google-cloud/storage');

// require path library
const path = require('path');

// our project ID
const GOOGLE_CLOUD_PROJECT_ID = 'dontphasemebros';

const GOOGLE_CLOUD_KEYFILE_NAME = path.join(__dirname, './dontphasemebros-cloud-storage.json');

const storage = new Storage({
  keyFilename: GOOGLE_CLOUD_KEYFILE_NAME,
  projectId: GOOGLE_CLOUD_PROJECT_ID,
});

module.exports = storage;
