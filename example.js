const winston = require('winston');
const Syslogs = require('./index');

const logger = new winston.Logger({
  transports: [
    new Syslogs({
      files: {
        filename: 'yourfilename.log',
        path: './logs',
        maxSize: '5mb',
      },
      sysConfig: {
        facility: 'local4',
        severity: 'error',
        host: 'localhost',
        appName: 'sudo',
        pid: '123',
        date: new Date(Date()),
      },
    }),
  ],
});

const myError = new Error();
myError.message = 'Error message';
myError.name = 'ERROR_NAME';

logger.error(myError.message);
