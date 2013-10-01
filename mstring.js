/* Copyright (c) 2012 Richard Rodger */

var errmsg = "mstring: required format is function (){/*** ... ***/}, this is invalid: ";

module.exports = function(f){
  if( !_.isFunction(f) ) {
    throw new Error(errmsg+f)
  }

  // allow for whitespace-indented lines
  var lines = f.toString().split('\n');
  for (var i = 0; i < lines.length; ++i) {
    lines[i] = lines[i].replace(/^\s+|\s+$/g, '');
  }

  var fs = lines.join('\n');
  var m  = fs.match(/^function\s*\(\)\s*\{\s*\/\*\*\*\n([\s\S]*)\n\*\*\*\/\s*\}$/) 

  if( m && _.isString(m[1]) ) {
    return m[1]
  }
  else throw new Error(errmsg+f)
}


var _ = {};
_.isFunction = function(obj) {
  return !!(obj && obj.constructor && obj.call && obj.apply)
}
_.isString = function(obj) {
  return !!(obj === '' || (obj && obj.charCodeAt && obj.substr))
}
