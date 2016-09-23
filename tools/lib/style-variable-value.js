'use strict';

const fs = require('fs');

function parseVariableValue(contents, variableName) {
    let variableValue = null;
    const variableNameRegExp = new RegExp(
        `\\$${variableName}.*?(#[a-fA-F0-9]{3}([a-fA-F0-9]{3})?).*?[\\)\\,\\;]`,
        'i'
    );
    const searchVariableValue = contents.match(variableNameRegExp);

    if (searchVariableValue && searchVariableValue[1]) {
        variableValue = searchVariableValue[1].toLowerCase();

        if (variableValue.length === 4) {
            variableValue = variableValue[0]
                + variableValue[1]
                + variableValue[1]
                + variableValue[2]
                + variableValue[2]
                + variableValue[3]
                + variableValue[3];
        }
    }

    return variableValue;
}

module.exports = (filename, variableName) => new Promise((resolve, reject) => {
    fs.readFile(filename, 'utf-8', (error, contents) => {
        if (error) {
            return reject(new Error(error));
        }

        let variableValue = null;

        if (contents.length > 0) {
            variableValue = parseVariableValue(contents, variableName);
        }

        return resolve(variableValue);
    });
});
