// const { getIsPythonInstalled } = require('../lib/python-installed');
const path = require('path');

const { execute, setEnvironment, updateEnvironment } = require('../lib/installer');

const { download } = require('../lib/downloader');

const JDK_VERSION = '8u231';
const BUILD = '11';
const JAVA_VERSION = '1.8.0_231';
const UNINSTALL_ID = '180221';
const ID = '5b13a193868b4bf28bcb45c792fce896';

const JDK_INSTALLER = `https://javadl.oracle.com/webapps/download/GetFile/${JAVA_VERSION}-b${BUILD}/${ID}/windows-i586/jdk-${JDK_VERSION}-windows-x64.exe`;

const LOCALAPPDATA = process.env.LOCALAPPDATA;

const install = async () => {
    console.log(`Checking if JDK 8 is installed`);

    const installed = false;

    if (installed) {
        console.log('JDK is installed. Skipping installation');

        return;
    }

    console.log('Downloading JDK installer')
    // const jdkInstaller = await download(JDK_INSTALLER);
    const jdkInstaller = `C:\\Users\\antonmo\\AppData\\Local\\Temp\\jdk-8u231-windows-x64.exe`
    const targetDir = path.join(LOCALAPPDATA, 'jdk8');

    // This needs admin privileges. Later versions of JDK don't seem to require it. Look if they're compatible:
    // https://zemian.github.io/blog/2018/03/install-windows-jdk-without-admin-rights.html
    const installJDK = `"${jdkInstaller}" /s INSTALLDIR="${targetDir}" ADDLOCAL="ToolsFeature,SourceFeature"`;

    await execute(installJDK);

    await setEnvironment('JAVA_HOME', targetDir);
    await updateEnvironment('PATH', path.join(targetDir, 'bin'));
};

module.exports = {
    install
};
