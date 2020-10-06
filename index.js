const winston = require("winston")
const setupDefaultLogger = require("./setupDefaultLogger.js")
setupDefaultLogger()

winston.info("A info log")
winston.debug("A debug log")
winston.warn("A warning log")
try{
    throw new Error("Some Error")
}catch (e) {
    winston.error("A error log",e)
}
