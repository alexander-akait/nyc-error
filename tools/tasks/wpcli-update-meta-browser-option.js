'use strict';

const path = require('path');
const wpcliCommand = require('../lib/wpcli');
const styleVariableValue = require('../lib/style-variable-value');

function run() {
    return styleVariableValue(
        path.resolve('_variables.scss'),
        'brand-primary'
    )
        .then(
            (brandPrimaryColor) => wpcliCommand({
                args: [
                    'option',
                    'update',
                    'meta_browsers',
                    JSON.stringify({
                        'msapplication-navbutton-color': brandPrimaryColor,
                        'msapplication-TileColor': brandPrimaryColor,
                        'theme-color': brandPrimaryColor
                    }), '--format=json']
            })
                .catch((error) => {
                    if (error.code !== 1) {
                        return Promise.reject(error);
                    }

                    return Promise.resolve();
                })
        );
}

run()
    .catch((error) => {
        console.log(error.stack); // eslint-disable-line no-console
        process.exit(1); // eslint-disable-line no-process-exit
    });
