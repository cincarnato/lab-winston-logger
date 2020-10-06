const winston = require("winston")

function transportsFactory(){
    let transports = [new winston.transports.Console({
        level: 'debug'
    })]

    transports.push(
        new winston.transports.File({
            filename: 'logs/combined.log',
        })
    )

    transports.push(
        new winston.transports.File({
            filename: 'logs/errors.log',
            level: 'error',
            handleExceptions: true
        })
    )


    return transports
}

function getLogFormatter() {
    const {combine, timestamp, printf, errors, colorize} = winston.format;

    return combine(
        errors({ stack: true }),
        timestamp(),
        colorize(),
        printf(({ level, message, timestamp, stack }) => {
            if (stack) {
                return `${timestamp} ${level}: ${message} - ${stack}`;
            }
            return `${timestamp} ${level}: ${message}`;
        }),
    );
}


function setupDefaultLogger(){

    winston.configure({
        transports: transportsFactory(),
        format: getLogFormatter()
    });

}


module.exports =  setupDefaultLogger


