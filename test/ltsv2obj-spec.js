var ltsv2obj = require('../index.js').ltsv2obj,
    should = require('should'),
    assert = require('assert'),
    evEmitter = require('events').EventEmitter;

var LTSV_BASE = 'test/test-base.ltsv';
var ltsvParser = new ltsv2obj(LTSV_BASE);

describe('about generate ltsv2obj as default', function(){
    var ltsv_default = new ltsv2obj(LTSV_BASE);
    // type
    it('should inherits EventEmitter', function(){
        assert.ok(ltsv_default instanceof  evEmitter);
    });

    // property
    it('should has default property', function(){
        ltsv_default.config.should.have.property('cache', false);
        ltsv_default.should.have.property('path', LTSV_BASE);
        should.exist(ltsv_default.readStore);
        should.not.exist(ltsv_default.data);
    });

    //function
    it('should has methods', function(){
        // prototype methods
        ltsv_default.begin.should.have.type('function');
        ltsv_default.validateFile.should.have.type('function');
        ltsv_default.parseLTSV.should.have.type('function');
        ltsv_default.getCache.should.have.type('function');
    });
});

describe('about generate ltsv2obj with options', function(){
    var cache_true = new ltsv2obj(LTSV_BASE, {cache: true});
    var cache_false = new ltsv2obj(LTSV_BASE, {cache: false});

    it('should has custom property', function() {
        cache_true.config.cache.should.be.true;
        cache_false.config.cache.should.be.false;
    });

    it('should have data property only if cache option sat true', function() {
        should.exist(cache_true.data);
        should.not.exist(cache_false.data);
    });
});

describe('about behavior methods', function(){

    var filePath = 'test/test-base.ltsv';
    var dirPath =  'test';

    it('should return true only if the file path is given', function(){
        should.ok(ltsvParser.validateFile(filePath));
        should.ok(!ltsvParser.validateFile(dirPath));
    });

    it('should parse LTSV string', function(){
        var parsed = ltsvParser.parseLTSV('str:string\tnum:123\tbool:true\r\n');
        var expect = {
            str:'string',
            num:123,
            bool:true
        };
        expect.str.should.equal(parsed.str);
        expect.num.should.equal(parsed.num);
        expect.bool.should.equal(parsed.bool);
        assert.deepEqual(parsed, expect, 'it is deep equal between actual and expect');
    });
});

describe('fire events', function(){
    it('should fire add event per parse');
    it('should fire end event in finish parse');
});
