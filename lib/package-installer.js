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
		// split string based on colon and space
		var pair = dependenciesList[i].split(': ');

		// store each item in a variable, trim extra spaces
		var dependent = pair[0].trim();
		var dependency = pair[1].trim();

		if (output.indexOf(dependent) == -1) { // item is not already in list
			output.push(dependent);
		}

		if (dependency && output.indexOf(dependency) == -1) { // there is a dependency that is not already in the list

			// insert dependency right before is dependent
			output.splice(output.indexOf(dependent), 0, dependency); 
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