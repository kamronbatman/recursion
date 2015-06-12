// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:

var stringifyJSON = function(obj) {
	var objType = typeof obj;

	switch (objType) {
		case 'number':
		case 'boolean':
			return obj.toString();
		case 'string':
			return '"' + obj.toString() + '"';
		case 'object':
		{
			if (_.isNull(obj)) {
				return 'null';
			}
			else if (_.isArray(obj)) {
				return '[' +
					(_.chain(obj)
					.filter(function(value){ return !(_.isFunction(value) || _.isUndefined(value)); })
					.reduce(function(memo, value, index){
						return memo += (index ? ',' : '') + stringifyJSON(value); //Prettify?
					}, '').value() || '')
					+ ']';
			}
			else
			{
				return '{' +
					(_.chain(obj)
					.pick(function(value){ return !(_.isFunction(value) || _.isUndefined(value)); })
					.reduce(function(memo, value, key){
						return memo += (memo.length ? ',' : '') + stringifyJSON(key) + ':' + stringifyJSON(value);
					}, '').value() || '')
					+ '}';
			}
		}
	}
};
