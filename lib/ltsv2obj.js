var eventEmit = require('events').EventEmitter
    , util = require('util')
    , fs = require('fs')
    , _ud = require('underscore');

function ltsv2obj(path, options) {
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


ltsv2obj.prototype.readFile = function(){
    var readStream = fs.createReadStream(this.path);
    readStream.on('data', this._onStreamData);
    readStream.on('end', this._onStreamEnd);
};


ltsv2obj.prototype._onStreamData = function(chunk){
    return function(chunk){
        this.readStore += chunk.toString();
    }
};

ltsv2obj.prototype._onStreamEnd = function(){
    return function(){
        var terminal = this.readStore.slice(-1);
        if(terminal != '\r' || terminal != '\n'){
            self.readStore += '\r';
        }
        this.emit('readend');
    }
};


ltsv2obj.prototype.parse = function(callback){
    while(this.readStore){
        while(this.readStore.match(/\r?\n/)){
            this.readStore = RegExp.rightContext;
            var obj = this.convertToJSON(RegExp.leftContext);
            if(this.config.cache) this.data.push(obj);
            callback(obj);
            this.emit('add');
        }
    }
};

ltsv2obj.prototype.convertToJSON = function(ltsvStr){
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

ltsv2obj.prototype.begin = function(cb){
    this.readFile();
    this.parse(cb);
    this.emit('begin');
};

ltsv2obj.prototype.getCache = function(){
    return this.data;
};

ltsv2obj.prototype._getValue = function(value){
    if(value.match(/[^0-9]/)){
        if(value === 'true' || value === 'false') value=(value === 'true');
    } else {
        value = +value;
    }
    return value;
};
module.exports.ltsv2obj = ltsv2obj;