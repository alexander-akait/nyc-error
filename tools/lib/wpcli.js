'use strict';

const spawn = require('child_process').spawn;
const path = require('path');

function runCommand(options) {
    return new Promise((resolve, reject) => {
        const args = options.args;

        args.push('--allow-root');

        const command = {
            args: args || ['--allow-root'],
            command: options.bin
        };

        const spawnCommand = spawn(command.command, command.args, command.options);

        let outputData = '';
        let errorData = '';

        spawnCommand.stdout.on('data', (data) => {
            outputData += data;
        });

        spawnCommand.stderr.on('data', (data) => {
            errorData += data;
        });

        spawnCommand.on('error', (error) => reject(new Error(error)));

        spawnCommand.on('exit', (code) => {
            if (code !== 0) {
                const error = new Error(
                    `Command "${command.command}" with args "${command.args}" exit with code ${code}: ${errorData}`
                );

                error.code = code;

                return reject(error);
            }

            const ret = {
                code,
                outputData
            };

            return resolve(ret);
        });
    });
}

module.exports = function wpcliCommand(options) {
    const opts = Object.assign({
        bin: path.resolve(path.join(__dirname, '../../wp-cli.phar'))
    }, options);

    opts.bin = path.resolve(opts.bin);

    return runCommand(opts);
};
