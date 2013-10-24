var ltsv2obj = require('../index.js').ltsv2obj,
    should = require('should'),
    assert = require('assert');

describe('ltsv2obj(path)', function(){

    var ltsvParser = new ltsv2obj('test/test-base.ltsv');
    it('should inherits EventEmitter', function(){
        var eventEmitter = require('events').EventEmitter
        assert.ok(ltsvParser instanceof eventEmitter);
    });

    it('should has default property', function(){
        ltsvParser.should.have.property('path', 'test/test-base.ltsv');
        ltsvParser.should.have.property('readStore', '');
        var config = ltsvParser.config;
        config.should.have.property('cache', false);
        should.not.exist(ltsvParser.data);
    });

});

describe('ltsv2obj(path, option)', function(){
    var cache = new ltsv2obj('test/test-base.ltsv', {cache: true});
    var uncache = new ltsv2obj('test/test-base.ltsv', {cache: false});

    it('should has custom property', function() {
        (cache.config.cache).should.be.true;
        (uncache.config.cache).should.be.false;
    });

    it('should have data property only if cache option sat true', function() {
        should.exist(cache.data);
        should.not.exist(uncache.data);
    });
});

describe('_onStreamData()', function(){
    it('should return function');
});

describe('_onStreamEnd()', function(){
    it('should return function');
});

describe('parse()', function(){
    it('should parse LTSV string while reading');
});

describe('convertToJSON(ltsv_string)', function(){
    var ltsvParser = new ltsv2obj('test/test-base.ltsv');
    it('should return JSON object', function(){
        var parsed = ltsvParser.convertToJSON('str:string\tnum:123\tbool:true\r\n');
        var expect = {
            str:'string',
            num:123,
            bool:true
        };
        assert.deepEqual(parsed, expect, 'it is deep equal between actual and expect');
    });
});



describe('events', function(){
    it('should fire "begin", "end", "add" and "readend" for reading file', function(done){
        var lineNum=0;
        var ltsv2Parser = new ltsv2obj('test/test-base.ltsv');

        ltsv2Parser.on('begin',function(){
            assert.ok(true, 'fire begin event');
        });

        ltsv2Parser.on('end',function(){
            assert.ok(true, 'fire end event');
        });

        ltsv2Parser.on('add', function(){
            lineNum++;
        });

        ltsv2Parser.on('readend',function(){
            assert.ok(true, 'fire readend event');
        });


        ltsv2Parser.begin(function(obj){
            obj.should.have.property('string');
            obj.should.have.property('numeric');
            obj.should.have.property('bool');
        });
        done();
    });
});

describe('getCache()', function(){
    it('should return JSON array when cache');
});
