
var assert = require('assert')

var M = require('./mstring')

var a_b = {
    a: M(function(){/***
a
b
***/}),
    b: M(function(){
/***
a
b
***/})
};

var _a_b_ = {
  a: M(function(){/***

a
b

***/}),
  b: M(function(){
/***

a
b

***/})
};

var indented = {
    a: M(function(){/***
        a
        b
        ***/}),
    b: M(function(){
        /***
        a
        b
        ***/})
};

var blankline_indented = {
    a: M(function(){/***
        
        a
        b
        
        ***/}),
    b: M(function(){
        /***
        
        a
        b
        
        ***/})
};

!(function() {

    for( var t in a_b ) {
      assert.equal("a\nb", a_b[t]);
    }

    for( var t in _a_b_ ) {
      assert.equal("\na\nb\n", _a_b_[t]);
    }
    
    var pad8 = '        ';
    
    for( var t in indented ) {
      assert.equal(pad8 + "a\n" + pad8 + "b", indented[t]);
    }
    
    for( var t in blankline_indented ) {   
      assert.equal(pad8 + "\n" + pad8 + "a\n" + pad8 + "b\n" + pad8, blankline_indented[t]);
    }
    
    try {
      var f = function(){}
      M(f);
      assert.fail();
    }
    catch(e) { 
      if( 'AssertionError'==e.name ) throw e; 
      assert.equal('Error: mstring: required format is function (){/*** ... ***/}, this is invalid: function (){}',e.toString());
    }
}());
