// this is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;

// but you're not, so you'll write it from scratch:
var parseJSON = function(json) {
  // your code goes hereš 
var at, ch;
at = 0;
ch = json.charAt(at);

var next = function(){
	at += 1;
	ch = json.charAt(at);
	return ch;
};

var error = function(message){
	console.log(message);
	throw undefined;
};

var value = function () {
  switch(ch) {
    case '{':
      return object();
    case '[':
      return array();
    case '\"':
      return string();
    case 't':
    case 'f':
      return bool();
    case 'n':
      return nully();
    default:
      if(ch === '-' || (ch && ch >= 0 && ch <= 9)) { // number
        return number();
      } else {
        error('bad JSON');
      }
      break;
  }
};

var nully = function() {
  // ch is at 'n', verify and return null
  var nully = '';
  if(ch === 'n') {
    _.times(4, function() {
      nully += ch;
      next();
    });
    if(nully === 'null') {
      return null;
    } else {
      error('bad null');
    }
  }

  error('bad null');
};

var bool = function() {
  // ch is at 't' of 'f', verify & return the boolean
  var bool = '';
  if(ch === 't') {
    _.times(4, function() {
      bool += ch;
      next();
    });
    if(bool === 'true') {
      return true;
    } else {
      error('bad bool');
    }
  } else if(ch === 'f') {
    _.times(5, function() {
      bool += ch;
      next();
    });
    if(bool === 'false') {
      return false;
    } else {
      error('bad bool');
    }
  }

  error('bad bool');
};

var number = function() {
  // ch is at negative sign '-' or digit 0-9, create & return the number
  var number = ''; // create string and then use Number() to convert
  function getDigits() { // collect consecutive digits until non-digit is reached
    while(ch && ch >= 0 && ch <= 9) { // need to avoid empty strings
      number += ch;
      next();
    }
  }

  // optional - get neg sign
  if(ch === '-') {
    number += ch;
    next();
  }

  getDigits();

  // optional - get decimal point
  if(ch === '.') {
    number += ch;
    next();
    getDigits();
  }

  // optional - get exponential
  if(ch === 'e' || ch === 'E') {
    number += ch;
    next();
    // required - get sign of exponent
    if(ch === '-' || ch === '+') {
      number += ch;
      next();
    }
    getDigits(); // exponent
  }

  if(!isNaN(Number(number))) { // check if string can be converted to number
    return Number(number);
  } else { // string could not be converted to number
    error('bad number');
  }
};

var escapes = { // helper variable
  'b': '\b',
  'n': '\n',
  't': '\t',
  'r': '\r',
  'f': '\f',
  '\"': '\"',
  '\\': '\\'
};

var string = function(){
	var string = '';
	if (ch !== '\"') error('string should start with \"');
	next();
	while(ch){
		if (ch === '\"'){
			next();
			return string;
		}
		if(ch === '\\'){
			next();
			if (escapes.hasOwnProperty(ch)){
				string += escapes[ch];
			} else {
				string += ch;
			}
		} else {
			string += ch;
		}
		next();
	}
	error('bad string')
}

var array = function(){
	var array = [];
	if (ch !== '[') error('array should start with [');
	if (next() === ']') {
		return array
	}

	do{
		array.push(value());
		if (ch === ']'){
			next();
			return array;
		}
	} while (ch && ch === ',' && next());
	error ('bad array')
};

var object = function(){
	var object = {};
	if (ch !== '{') error ('object should start with {');
	if (next() === '}'){
		return object;
	}
	do{
		var key = string();
		if (ch !== ':') error ('object property should have ":"');
		next();
		object[key] = value();
		if (ch === '}'){
			next();
			return object;
		}
	} while (ch && ch === ',' && next());
	error('bad object');
}

  return value();
};



