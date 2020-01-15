const os = require('os');
const path = require('path');
const stream = require('stream');
const { promisify } = require('util');
const fs = require('fs');

const got = require('got');

const pipeline = promisify(stream.pipeline);

/**
 *
 * @param {string} url
 * @returns {Promise<string>} The path where the file was downloaded
 */
const download = async (url) => {
    try {

        const fileName = path.basename(url);
        const tmpDir = path.join(os.tmpdir(), fileName);

        console.log(`${url} ==> ${tmpDir}`);

        await pipeline(
            got.stream(url),
            fs.createWriteStream(tmpDir)
        );

        return tmpDir;
    } catch (e) {
        console.error(e);
        throw e;
    }
};

module.exports = {
    download
};
