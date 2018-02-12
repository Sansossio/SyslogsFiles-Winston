const winston = require('winston');
const Syslogs = require('./index');

const logger = new winston.Logger({
  transports: [
    new Syslogs({
      files: {
        filename: '',
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
myError.message = 'Test error123';
myError.name = 'TEST';

logger.error(myError.message);
