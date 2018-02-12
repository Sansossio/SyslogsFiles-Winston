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

### Example

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
