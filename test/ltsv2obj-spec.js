var ltsv2obj = require('../index.js').ltsv2obj,
    should = require('should'),
    assert = require('assert'),
    evEmitter = require('events').EventEmitter;

var TYPES = ['string', 'number', 'function', 'object'];
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
        TYPES[2].should.equal(typeof ltsv_default.begin);
        TYPES[2].should.equal(typeof ltsv_default.validateFile);
        TYPES[2].should.equal(typeof ltsv_default.parseLTSV);
        TYPES[2].should.equal(typeof ltsv_default.getCache);
    });
});

describe('about generate ltsv2obj with options', function(){
    var ltsv_custom = new ltsv2obj(LTSV_BASE, {cache: true});

    it('should has custom property', function() {
        true.should.equal(ltsv_custom.config.cache);
    });
    it('should have data property when set cache option');

});

describe('about behavior methods', function(){

    var filePath = 'test/test-base.ltsv';
    var dirPath =  'test';

    it('should parse LTSV string');

    it('should return true only if the file path is given', function(){
        should.ok(ltsvParser.validateFile(filePath));
        should.ok(!ltsvParser.validateFile(dirPath));
    });
});


describe('fire events', function(){

    it('should fire add event per parse');
    it('should fire end event in finish parse');
});
