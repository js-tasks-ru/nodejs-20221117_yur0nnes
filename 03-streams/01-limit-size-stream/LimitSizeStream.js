const stream = require('stream');
const LimitExceededError = require('./LimitExceededError');
let limitSize = []
class LimitSizeStream extends stream.Transform {
  size = 0
  constructor(options) {
    super(options);
    this.limit = options.limit
    this.encoding = options.encoding
  }

  _transform(chunk, encoding, callback) {
    this.size += chunk.length
    if (this.size > this.limit) callback(new LimitExceededError())
    else callback(null, chunk)
  }
}

module.exports = LimitSizeStream;
