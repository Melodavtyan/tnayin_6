// eslint-disable-next-line no-unused-vars
const moment = require('moment');
// eslint-disable-next-line no-unused-vars
const fs = require('fs');
const { Transform } = require('stream');

setInterval(() => {
  const transform = new Transform({
    transform(chunk, _utf8, next) {
      this.push(chunk.toString());
      next();
    },

  });

  transform.write(moment().format('LTS'));

  transform.on('data', (data) => {
    // eslint-disable-next-line no-shadow
    const ws = fs.createWriteStream('./text.txt');
    ws.write(data);

    // eslint-disable-next-line no-shadow
    const rs = fs.createReadStream('./text.txt');
    // eslint-disable-next-line no-shadow
    rs.on('data', (data) => {
      // eslint-disable-next-line no-console
      console.log(data.toString());
    });
  });
}, 1000);
