// Import modules
const { Produce } = require('glossy');
const Winston = require('winston');
const Transport = require('winston-transport');
const moment = require('moment');

/**
 * Syslogs
 */
class Syslogs extends Transport {
  /**
   * Contructor
   * @param {Object} options Options for generate logs in syslogs format
   */
  constructor(opt) {
    // Options
    const options = typeof opt === 'object' ? opt : {};
    // Set options in parent
    super(options);
    // Save options as property
    this.options = options;
    this.Producer = new Produce();
    // Generate need properties
    this._generateProperties();
  }
  // Private methods
  _generateProperties() {
    // Config vars
    const defaultName = `${moment(new Date()).format('YYYYMMDD')}.log`;
    // Get properties
    const {
      path,
      filename,
      type,
      facility,
      pid,
      host,
      appId,
      appName,
      msgId,
      prival,
      date,
    } = this.options.sysConfig;
    // File properties
    const fileProperties = {
      filename: filename || defaultName,
      path: path || './logs',
    };
    fileProperties.absoluteRoute = `${fileProperties.path}/${fileProperties.filename}`;

    this.options.files = Object.assign(this.options.files, fileProperties);
    // Properties
    this.type = !type || !type.match(/bsd|3164/i) ? 'RFC3164' : 'RFC5424';
    this.facility = facility;
    this.pid = pid || '-';
    this.appId = appId || '-';
    this.appName = appName || '-';
    this.msgId = msgId || '-';
    this.host = host || 'localhost';
    this.prival = prival;
    this.structuredData = true;
    this.date = date instanceof Date ? date : new Date(new Date());
  }
  _produce(message, severity) {
    // Create options files
    const options = this;
    options.severity = severity;
    options.message = message;
    // Generate string
    return this.Producer.produce(options);
  }
  // Primitive methods
  log(info, error, options, callback) {
    // Get syslogs message
    const parserMessage = this._produce(error, info);
    // Call winston native files
    const logger = new Winston.Logger({
      transports: [
        new Winston.transports.File({
          filename: this.options.files.absoluteRoute,
          maxSize: this.options.files.maxSize || 0,
          level: info,
          json: false,
          timestamp: false,
        }),
      ],
    });
    // Send error
    logger[info](parserMessage);
    // Callback
    if (typeof callback === 'function') callback();
  }
}

module.exports = Syslogs;
