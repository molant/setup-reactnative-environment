const { exec } = require('child_process');

const execute = (command) => {
    return new Promise((done, error) => {

        console.log(command);

        exec(command, (err, stdout, stderr) => {
            if (err) {
                error(err);
            }

            console.log(stdout);
            console.log(stderr);

            done();
        });
    });
};

/**
 * Prepends the given `value` to the user environment `variable`.
 * @param {string} variable The environment variable to modify
 * @param {string} value The value to add to the variable
 * @returns {Promise<void>}
 */
const updateEnvironment = (variable, value) => {
    // https://superuser.com/a/601034
    const command = `for /f "skip=2 tokens=3*" %a in ('reg query HKCU\Environment /v ${variable}') do @if [%b]==[] ( @setx ${variable} "${value};%~a" ) else ( @setx ${variable} "${value};%~a %~b" )
    `;

    return execute(command);
};

module.exports = {
    execute,
    updateEnvironment
};
