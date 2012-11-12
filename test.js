
var assert = require('assert')

var M = require('./mstring')

var a_b = {

  a:
M(function(){/***
a
b
***/})

  ,b:
M(function(){
/***
a
b
***/
})

}


var _a_b_ = {

  a:
M(function(){/***

a
b

***/})

  ,b:
M(function(){
/***

a
b

***/
})

}


for( var t in a_b ) {
  assert.equal("a\nb",a_b[t])
}

for( var t in _a_b_ ) {
  assert.equal("\na\nb\n",_a_b_[t])
}


try {
  var f = function(){}
  M(f)
  assert.fail()
}
catch(e) { 
  if( 'AssertionError'==e.name ) throw e; 
  assert.equal('Error: mstring: required format is function (){/*** ... ***/}, this is invalid: function (){}',e.toString())
}