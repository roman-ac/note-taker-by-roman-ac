const util = require("util");
const fs = require("fs");
const { json } = require("express/lib/response");
// const uuid = require("uuid").v1;

const readFromFile = util.promisify(fs.readFile);

const writeToFile = (destination, content) =>
    fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
    err ? console.err : console.info (`\nData written to ${destination}`)
    );

const readAndAppend = (content, file) => {
    fs.readFile(file, 'utf8', (err, data) =>{
        if (err) {
            console.error(err);
        } else {
            const parsedData = JSON.parse(data);
            parsedData.push(content);
            writeToFile(file, parsedData);
        }
    });
};



module.exports = {
    readFromFile,
    writeToFile,
    readAndAppend
};