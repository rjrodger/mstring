/* Copyright (c) 2012 Richard Rodger */

var errmsg = "mstring: required format is function (){/*** ... ***/}, this is invalid: "

module.exports = function(f){
  if( !_.isFunction(f) ) {
    throw new Error(errmsg+f)
  }

  var fs = f.toString()
  var m  = fs.match(/^function\s*\(\)\s*\{\s*\/\*\*\*([\s\S]*)(\n\s*)\*\*\*\/\s*\}$/);
  
  if( m && _.isString(m[1]) ) {
    var out = m[1]
    if( 1 < m[2].length ) {
      out = out.replace(new RegExp(m[2],'g'),'\n')
    }
    out = out.replace(/^\n/,'')
    return out;
  }
  else throw new Error(errmsg+f);
}


var _ = {}
_.isFunction = function(obj) {
  return !!(obj && obj.constructor && obj.call && obj.apply);
};
_.isString = function(obj) {
  return !!(obj === '' || (obj && obj.charCodeAt && obj.substr));
};

