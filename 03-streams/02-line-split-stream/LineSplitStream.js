const stream = require('stream');

class LineSplitStream extends stream.Transform {
  str = ''
  constructor(options) {
    super(options);
  }

  _transform(chunk, encoding, callback) {
    // chunk.toString().replaceAll(os.EOL, '-').split('').forEach(char => {
    //   if (char == '-') {
    //     this.push(this.str)
    //     this.str = ''
    //   } else this.str += char
    // })
    // ---------------------------------
    // let text = chunk.toString()
    // for (let i = 0; i < text.length; i++) {
    //   if (text[i] == os.EOL) {
    //     this.push(this.str)
    //     this.str = ''
    //   } else this.str += text[i]
    // }
    // ----------------------------------
    for (let i = 0; i < chunk.length; i++) {
        if (chunk[i] == 13 || chunk[i] == 10) {
          this.push(this.str);
          this.str = '';
        } else this.str += String.fromCharCode(chunk[i]);
    }
    callback()
  }

  _flush(callback) {
    callback(null, this.str)
  }
}

module.exports = LineSplitStream;
