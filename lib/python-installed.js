import { spawnSync } from 'child_process';

/**
 * @returns {boolean}
 */
const getIsPythonInstalled = () => {
    try {
        /** @type {any} */
        const options = { windowsHide: true, stdio: null };
        const { output } = spawnSync('python', ['-V'], options);
        const version = output.toString().trim().replace(/,/g, '');

        return version && version.includes(' 2.');
    } catch (error) {
        return false;
    }
};

module.exports = {
    getIsPythonInstalled
};
