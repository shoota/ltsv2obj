var eventEmit = require('events').EventEmitter
    , util = require('util')
    , fs = require('fs')
    , _ud = require('underscore');

function ltsv2obj(path, options) {
    if(! this.validateFile(path)) this.emit('error');
    this.config = _ud.extend(options,
        {
            cache: false
        });
    this.path = path;
    this.readStore='';
    if(this.config.cache) this.data=[];

    eventEmit.call(this);
}
util.inherits(ltsv2obj, eventEmit);

ltsv2obj.prototype.begin = function(callback){
    var readStream = fs.createReadStream(this.path);
    var self = this;
    readStream.on('data', function(chunk) {
        self.readStore += chunk.toString();
        while(self.readStore.match(/\r?\n/)){
            self.readStore = RegExp.rightContext;
            var obj = self.parseLTSV(RegExp.leftContext);
            if(self.config.cache) self.data.push(obj);
            callback(obj);
            self.emit('added');
        }
    });
    readStream.on('end', function(){
        self.readStore='';
        self.emit('end');
    });
};

ltsv2obj.prototype.parseLTSV = function(ltsvStr){
    var obj={};
    return obj;
};

ltsv2obj.prototype.getCache = function(){
    return this.data;
};

ltsv2obj.prototype.validateFile = function(filePath){
    var fileStat = fs.statSync(filePath);
    return fileStat.isFile();
};


module.exports.ltsv2obj = ltsv2obj;