// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:

var stringifyJSON = function(obj) {
var result = ''

if (typeof obj === 'string'){
	return '"' + obj + '"';
} else if (typeof obj === 'number' || typeof obj === 'boolean' || obj === null ){
	return String(obj);
} else if (Array.isArray(obj)){
	result = '[';
	for (var i = 0; i < obj.length; i++){
		result += stringifyJSON(obj[i]);
		if(i + 1 < obj.length){
			result += ',';
		}
	}
	result += ']';
} else if (typeof obj === 'object'){
	result = '{';
	for (var key in obj){
		if (obj[key] !== undefined && typeof obj[key] !== 'function' && typeof obj[key] !== 'symbol'){
			result += '"' + key + '":';
			result = result + stringifyJSON(obj[key]) + ','; 
		} 
	}
	if (result.charAt(result.length -1) === ','){
		result = result.slice(0, result.length-1)
	}
	result += '}'
}  else if (obj === undefined){
	return undefined
}	
return result; 

};

