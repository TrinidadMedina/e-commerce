const log4js = require('log4js');

log4js.configure({
    appenders: {
        consoleLogger: {type: 'console'},
        fileLogger: {type: 'file', filename: 'error.log'}
    },
    categories:{
        default: {appenders: ['consoleLogger'], level: 'trace'},
        console: {appenders: ['consoleLogger'], level: 'debug'},
        file: {appenders: ['fileLogger'], level: 'warn'}
    }
})

exports.loggerConsole = log4js.getLogger('console');
exports.loggerFile = log4js.getLogger('file');