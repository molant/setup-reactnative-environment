const path = require('path');
const fs = require('fs');
const { exec } = require('child_process');
const unzipper = require('unzipper');

const { execute, setEnvironment, updateEnvironment } = require('../lib/installer');
const { download } = require('../lib/downloader');

const ANDROID_SDK_TOOLS = `https://dl.google.com/android/repository/sdk-tools-windows-4333796.zip`;

const LOCALAPPDATA = process.env.LOCALAPPDATA;

const packages = [
    // Android SDK ?
    // '"tools"', // These are the download ones, maybe change the name to just android-sdk and they will live under tools
    'platform-tools', // Android SDK Platform ?
    // need to detect if Hyper-V is enabled for the following
    // 'extras;intel;Hardware_Accelerated_Execution_Manager', // Performance (Intel ® HAXM) (See here for AMD)
    'extras;google;Android_Emulator_Hypervisor_Driver', // In case Hyper-V is enabled
    'emulator', // Android Virtual Device ?
    'platforms;android-28', // Android SDK Platform 28
    'system-images;android-28;default;x86_64', // Intel x86 Atom_64 System Image
    'build-tools;28.0.3' // Android SDK Build-Tools 28
];

const extractSdk = (source, destination) => {
    return new Promise((done, error) => {
        fs.createReadStream(source)
            .pipe(unzipper.Extract({ path: destination }))
            .on('close', done)
            .on('error', error);
    });
}

const installDependency = (command) => {
    return new Promise((done, error) => {
        const child = exec(command, { maxBuffer: 1024 * 500 });

        child.stdout.on('data', (data) => {
            if (data.includes('(y/N):')) {
                console.log(`Accepting License for ${command}`);

                child.stdin.write('y\n');
            }
        });

        child.stderr.on('data', (data) => {
            console.error(data);
        });

        child.on('close', done);
        child.on('error', error);
    });
};

const install = async () => {
    console.log(`Checking if Android SDK Tools are installed`);

    const installed = false;

    if (installed) {
        console.log('SDK Tools installed. Skipping installation');

        return;
    }

    console.log('Downloading Android SDK Tools')
    // const androidSdkTools = await download(ANDROID_SDK_TOOLS);
    const androidSdkTools = `C:\\Users\\antonmo\\AppData\\Local\\Temp\\sdk-tools-windows-4333796.zip`
    const targetDir = path.join(LOCALAPPDATA, 'Android');

    console.log(`Unzipping tools into ${targetDir}`);
    // await extractSdk(androidSdkTools, targetDir);
    console.log(`Done`);

    console.log(`Installing other Android packages`);


    /**
     * Maybe install packages individually with "echo yes | sdkmanager" to auto accept the licenses
     */
    const sdkmanager = path.join(targetDir, 'tools', 'bin', 'sdkmanager');

    // for (const package of packages) {
    //     const installAndroidDependenciesCommand = `${sdkmanager} "${package}"`;

    //     await installDependency(installAndroidDependenciesCommand);
    // }

    await setEnvironment('ANDROID_HOME', path.join(targetDir, 'sdk'));
    await updateEnvironment('PATH', path.join(targetDir, 'tools'));
    await updateEnvironment('PATH', path.join(targetDir, 'platform-tools'));

    const createAvd = `android create avd`;
};

module.exports = {
    install
};

