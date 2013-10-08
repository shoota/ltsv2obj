var eventEmit = require('events').EventEmitter
  , util = require('util')
  , fs = require('fs');


function ltsv2obj(path, options) {
    if(! this.validateFile(path)) this.emit('error');
    this.path = path;
    eventEmit.call(this);
}
util.inherits(ltsv2jobj, eventEmit);

ltsv2obj.prototype.begin = function(callback){
    var readStream = fs.createReadStream(this.path);
    readStream.on('data', function(chunk) {
        // TODO toJSON prrocess
    });
};

ltsv2obj.prototype.validateFile = function(){
    var fileStat = fs.statSync(this.path);
    if(fileStat.isDirectory() || fileStat.isSymbolicLink()) return false;
};


module.exports.ltsv2Obj = ltsv2obj;