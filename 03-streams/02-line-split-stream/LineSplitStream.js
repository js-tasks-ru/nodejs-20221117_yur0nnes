const stream = require('stream');
const os = require('os');

class LineSplitStream extends stream.Transform {
  constructor(options) {
    super(options);
  }

  _transform(chunk, encoding, callback) {
    chunk.forEach(el => {
      console.log(el)
    })
    callback(null, chunk)
  }

  _flush(callback) {

  }
}

module.exports = LineSplitStream;
