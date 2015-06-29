// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But instead we're going to implement it from scratch:
var getElementsByClassName = function(className){
	var classNames = className.split(' ');

	//Not the most effecient method I admit.
	var recurse = function(element) {
		var nodes = [];

		if (_.intersection(element.classList, classNames).length == classNames.length) { nodes.push( element ); }

		return nodes.concat(
			_.reduce(Array.prototype.slice.apply(element.childNodes), function(memo, value){ return memo.concat( recurse(value) ); },[]) );
	};

	return recurse(document.body);
};
