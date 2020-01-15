// const { getIsPythonInstalled } = require('../lib/python-installed');
const path = require('path');

const { execute } = require('../lib/installer');

const { download } = require('../lib/downloader');

const PYTHON_INSTALLER = 'https://www.python.org/ftp/python/2.7.9/python-2.7.9.amd64.msi';
const LOCALAPPDATA = process.env.LOCALAPPDATA;

const install = async () => {
    console.log(`Checking if Python 2 is installed`);

    const installed = false;

    if (installed) {
        console.log('Python is installed. Skipping installation');

        return;
    }

    console.log('Downloading Python installer')
    const pythonInstaller = await download(PYTHON_INSTALLER);
    const targetDir = path.join(LOCALAPPDATA, 'python2');

    const command = `msiexec.exe /i "${pythonInstaller}" TARGETDIR="${targetDir}" /qn /L*P "python-log.txt"`;

    await execute(command);

    console.log('Updating PATH');
    await execute(`setx PATH "${targetDir};%PATH%"`);
    // Add targetDir/Scripts?
};

module.exports = {
    install
};

