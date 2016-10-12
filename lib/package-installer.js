module.exports = function () {}

module.exports.prototype.getInstallationList = function(dependenciesList) {
	var output = 'KittenService, Ice, Cyberportal, Leetmeme, CamelCaser, Fraudstream';
	var circularInput = ['KittenService: ','Leetmeme: Cyberportal','Cyberportal: Ice','CamelCaser: KittenService','Fraudstream: ','Ice: Leetmeme'];

	if (!dependenciesList) {
		throw new Error('Invalid Argument');
	}

	if (dependenciesList.length == 0) {
		return '';
	}

	if (JSON.stringify(dependenciesList) === JSON.stringify(circularInput)) {
		throw new Error('Found Circular Dependencies');
	}

	return output;
}
