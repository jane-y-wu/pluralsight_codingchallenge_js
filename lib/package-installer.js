module.exports = function () {};

module.exports.prototype.getInstallationList = function(dependenciesList) {
	
	// list passed in is null
	if (!dependenciesList) {
		throw new Error('Invalid Argument');
	}

	// list passed in is empty
	if (dependenciesList.length == 0) {
		return '';
	}

	return '';
}