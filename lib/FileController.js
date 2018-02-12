/* eslint-disable */
const fs = require('fs');

class FileController {
  // Static methods
  static getSize(unit, maxSize) {
    // Logic var
    const units = ['b', 'kb', 'mb', 'gb', 'tb'];
    const index = units.indexOf(unit);
    const pow = Math.pow(1024, index);
    // Config var
    const multiply = index > 0 ? pow : 1;
    // Response
    return maxSize * multiply;
  }
  /**
   * FileController
   * @param {string} path Route of file
   * @param {string} filename Filename
   */
  constructor(options) {
    const { path, filename, maxSize, unit } = options;
    // Logic vars
    this.path = path;
    this.filename = filename;
    this.absolutePath = `${path}/${filename}`;
    this.maxSize = FileController.getSize(unit || 'b', maxSize);
    // Others
    this.options = { flag: 'wx' };
  }
  /**
   * generateFilename
   * @description Generate new filename for logs
   * @returns Promise with string
   */
  generateFilename() {
    this.newFilename = this.filename;
    // Comprobe if is number file
    if (this.newFilename.indexOf('_') > -1) {
      
    }
  }
  /**
   * writeInFile
   * @param {string} content Content to write
   * @description Write new content in file
   * @returns Promise (true or false)
   */
  writeInFile(content) {
    // Create file
    const Write = (resolve, reject) => {
      // Verif filsize
      fs.stat(this.absolutePath, (statError, fileStats) => {
        // Verif size
        if (fileStats.size > this.maxSize) {
          this.generateFilename()
            .then((newFilename) => {

            })
          console.log('filesize', this.filename)
        } else {
          // Write in file
          fs.appendFile(this.absolutePath, `\n${content}`, (err) => {
            if (err) return reject(err);
            resolve(true);
          });
        }
      });
    };
    // Logic
    const Logic = (resolve, reject) => {
      // Verif if exists file
      fs.exists(this.absolutePath, (exists) => {
        if (!exists) {
          // Create file
          fs.writeFile(
            this.absolutePath,
            content,
            this.options,
            (err) => {
              // Error handler
              if (err) return reject(err);
              // Write file content
              resolve(true);
            });
        } else {
          // If exists, write
          Write(resolve, reject);
        }
      })
    }
    // Response promise
    return new Promise(Logic);
  }
}

module.exports = FileController;
