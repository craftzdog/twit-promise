var Twit = require('twit');

Twit.prototype.get = denodeify(Twit.prototype.get);
Twit.prototype.post = denodeify(Twit.prototype.post);

module.exports = Twit;

function denodeify(fn, argumentCount) {
  argumentCount = argumentCount || Infinity;
  return function () {
    var self = this;
    var args = Array.prototype.slice.call(arguments, 0,
        argumentCount > 0 ? argumentCount : 0);
    return new Promise(function (resolve, reject) {
      args.push(function (err, data, res) {
        if (err) reject(err);
        else resolve({
          response: res,
          data: data
        });
      })
      var res = fn.apply(self, args);
      if (res &&
        (
          typeof res === 'object' ||
          typeof res === 'function'
        ) &&
        typeof res.then === 'function'
      ) {
        resolve(res);
      }
    })
  }
}
