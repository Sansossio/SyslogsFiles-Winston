# Syslogs Winston

SyslogsFiles-Winston is a simple transports for winston, principal features:

  - Create syslogs format files
  - Without syslog server
  - Magic

### Installation

Syslogs files requires [Node.js](https://nodejs.org/) v4+ to run.

Install the dependencies and start the server.

```sh
$ cd yourProject
$ npm install syslogsfiles-winston --save
```

### How to use?

```js
const winston = require('winston');
const Syslogs = require('syslogsfiles-winston');

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
```

### Logs example file

```
error: <163>1 2018-02-12T10:08:41.00+01:00 localhost sudo 123 - - Error message
error: <163>1 2018-02-12T10:08:41.00+01:00 google.com sudo 123 - - Error google
```
