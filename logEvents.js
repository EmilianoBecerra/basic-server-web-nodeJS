const { format } = require('date-fns');
const { v4: uuid } = require('uuid');
const fs = require('node:fs');
const fsPromise = require('node:fs').promises;
const path = require('path');


const logEvents = async (message, logName) => {
    const dateTime = `${format(new Date(), 'yyy-MM-dd\tHH:mm:ss')}`;
    const logItem = `${dateTime}\t${uuid()}\t${message}\n`;
    console.log(logItem);
    try {
        if(!fs.existsSync(path.join(__dirname,'logs'))){
            await fsPromise.mkdir(path.join(__dirname,'logs'))
        }
        await fsPromise.appendFile(path.join(__dirname,'logs', logName), logItem);
    } catch (error) {
        console.error(error);
    }
}

module.exports = logEvents;