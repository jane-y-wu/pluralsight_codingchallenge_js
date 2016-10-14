module.exports = function () {};

module.exports.prototype.getInstallationList = function(dependenciesList) {
	
	var output = [];
	var outputString = '';

	// list passed in is null
	if (!dependenciesList) {
		throw new Error('Invalid Argument');
	}

	// list passed in is empty
	if (dependenciesList.length == 0) {
		return '';
	}

	for (var i = 0; i < dependenciesList.length; i++) { // loop through each element in the list

		// booleans to record if item is already in the list; used to check for circular dependencies
		var dependentInList;
		var dependencyInList;

		// split string based on colon and space
		var pair = dependenciesList[i].split(': ');

		if (pair.length != 2) { // no colon space delimiter
			throw new Error('Invalid Argument: bad format');
		}

		// store each item in a variable, trim extra spaces

		var dependent = pair[0].trim();

		if (dependent.length == 0) { // if dependent is not valid
			throw new Error('Invalid Argument: bad format');
		}

		var dependency = pair[1].trim();

		// build output list
		if (output.indexOf(dependent) == -1) { // item is not already in list
			output.push(dependent);
		}
		else {
			dependentInList = true;
		}

		if (dependency && output.indexOf(dependency) == -1) { // there is a dependency that is not already in the list

			// insert dependency right before its dependent
			output.splice(output.indexOf(dependent), 0, dependency); 

		}
		else {
			dependencyInList = true;
		}

		// check for circular dependency, which is when both the dependent and dependency are in the list,
		// but the dependent comes BEFORE the dependency
		if (dependentInList && dependencyInList && (output.indexOf(dependent) < output.indexOf(dependency))) {
			throw new Error('Found Circular Dependencies');
		}

	}

	// loop through output array and construct string
	for (var i = 0; i < output.length; i++) {

		if (i == 0) {
			outputString += output[i];
		}
		else {
			outputString += ', ' + output[i];
		}
		
	}

	return outputString;
}