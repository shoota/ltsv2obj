var ltsv2obj = require('../index.js').ltsv2obj,
    should = require('should'),
    assert = require('assert'),
    evEmitter = require('events').EventEmitter;

var types = ['string', 'number', 'function', 'object'];

describe('about generate ltsv2obj as default', function(){
    var testFile_base = 'test/test-base.ltsv';
    var ltsv_default = new ltsv2obj(testFile_base, {});

    // type
    it('should inherits EventEmitter', function(){
        assert.ok(ltsv_default instanceof  evEmitter);
    });

    // property
    it('should has default property', function(){
        ltsv_default.config.should.have.property('cache', false);
        ltsv_default.should.have.property('path', testFile_base);
        should.exist(ltsv_default.readStore);
        should.not.exist(ltsv_default.data);
    });

    //function
    it('should has methods', function(){

        // constructor
        types[2].should.equal(typeof ltsv_default.ltsv2obj);

        // prototype methods
        types[2].should.equal(typeof ltsv_default.begin);
        types[2].should.equal(typeof ltsv_default.validateFile);
        types[2].should.equal(typeof ltsv_default.parseLTSV);
        types[2].should.equal(typeof ltsv_default.getCache);
    });
});

describe('about generate ltsv2obj with options', function(){

    it('should has custom property');
    it('should have data property when set cache option');

});

describe('about behaviour parseLTSV method', function(){
    it('should parse LTSV');
});

describe('fire events', function(){
    it('should fire add event per parse');
    it('should fire end event in finish parse');
});
