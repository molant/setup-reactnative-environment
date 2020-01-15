/**
 * 1. Get environment (mac or windows)
 * 2. Get what's already installed
 * 3. Download required files
 * 4. Install resources
 * 5. Update environment variables
 *
 */

require('./lib/validate-environment');

const { install: installPython } = require('./tasks/install-python');
const { install: installJDK } = require('./tasks/install-jdk');
const { install: installAndroidSDK } = require('./tasks/install-android');

const install = async () => {
    // await installPython();
    // await installJDK();
    await installAndroidSDK();
};

install();

