var ltsv2obj = require('../index.js').ltsv2obj,
    should = require('should'),
    assert = require('assert'),
    evEmitter = require('events').EventEmitter;

describe('generate ltsv2obj as default', function(){
    var testFile_base = 'test/test-base.ltsv';
    var ltsv = new ltsv2obj(testFile_base, {});


    // type
    it('should inherits EventEmitter', function(){
        assert.ok(ltsv instanceof  evEmitter);
    });

    // property
    it('should has default property', function(){
        ltsv.config.should.have.property('cache', false);
        ltsv.should.have.property('path', testFile_base);
        should.exist(ltsv.readStore);
        should.not.exist(ltsv.data);
    });

    // function
//    it('should has methods', function(){
//
//    });


});