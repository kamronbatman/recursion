// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:

var stringifyJSON = function(obj) {
	var objType = typeof obj;
	console.log('Type: ' + objType + ' and ' + ((obj === null || objType === 'undefined') ? 'null' : obj.toString()) );
	// your code goes here
	if (obj === null) {
		return 'null';
	} else if ( objType === 'number' || objType === 'boolean' ) {
		return obj.toString();
	}
	else if ( objType === 'string' ) {
		return '"' + obj.toString() + '"';
	}
	else if (Array.isArray(obj)) {
		return '[' +
			_.chain(obj)
			.filter(function(value){ var valType = typeof value; return valType !== 'function' && valType !== 'undefined'; })
			.reduce(function(memo, value, index, list){
				if (index > 0) { memo += ','; }
				return memo += stringifyJSON(value); //Prettify?
			}, '').value()
			+ ']';
	} else if (objType !== 'function') {
		return '{' +
			(_.chain(obj)
			.reduce(function(memo, value, key, list){
				var valType = typeof value;
				if (valType !== 'function' && valType !== 'undefined') {
					if (memo.length > 0) { memo += ','; }
					return memo += stringifyJSON(key) + ':' + stringifyJSON(value);
				}
			}, '').value() || '')
			+ '}';
	}
};
