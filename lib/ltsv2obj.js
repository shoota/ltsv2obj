var eventEmit = require('events').EventEmitter
    , util = require('util')
    , fs = require('fs')
    , _ud = require('underscore');

function ltsv2obj(path, options) {
    if(! this.validateFile(path)) this.emit('error');
    if(_ud.isUndefined(options)) options={};
    this.config = _ud.extend({
        cache:false
    }, options);

    this.path = path;
    this.readStore='';
    if(this.config.cache) this.data=[];

    eventEmit.call(this);
}
util.inherits(ltsv2obj, eventEmit);



ltsv2obj.prototype.begin = function(cb){
    this.readFile();
    this.parse(cb);
};


ltsv2obj.prototype.readFile = function(){
    var readStream = fs.createReadStream(this.path);
    var self = this;
    readStream.on('data', function(chunk) {
        self.readStore += chunk.toString();
    });
    readStream.on('end', function(){
        var terminal = self.readStore.slice(-1);
        if(terminal != '\r' || terminal != '\n'){
            self.readStore += '\r';
        }
        self.reading = false;
        self.emit('readend');
    });
};


ltsv2obj.prototype.parse = function(callback){
    while(this.readStore){
        while(this.readStore.match(/\r?\n/)){
            this.readStore = RegExp.rightContext;
            var obj = this.parseLTSV(RegExp.leftContext);
            if(this.config.cache) this.data.push(obj);
            callback(obj);
            this.emit('add');
        }
    }

};

ltsv2obj.prototype.parseLTSV = function(ltsvStr){
    var obj={};
    var buf=ltsvStr;

    while(buf.match(/\t|\r?\n/)){
        var kv=RegExp.leftContext;
        buf=RegExp.rightContext;

        if(!kv.match(/:/)) throw new Error('invalid format detected : ' + kv.toString());
        obj[RegExp.leftContext] = this._getValue(RegExp.rightContext);
    }
    return obj;
};

ltsv2obj.prototype._getValue = function(value){
    if(value.match(/[^0-9]/)){
        if(value === 'true' || value === 'false') value=(value === 'true');
    } else {
        value = +value;
    }
    return value;
};

ltsv2obj.prototype.getCache = function(){
    return this.data;
};

ltsv2obj.prototype.validateFile = function(filePath){
    var fileStat = fs.statSync(filePath);
    return fileStat.isFile();
};

module.exports.ltsv2obj = ltsv2obj;