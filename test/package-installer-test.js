var should = require('should');
var PackageInstaller = require('../lib/package-installer');

var packageInstaller;

describe('different types of outputs', function() {

	before(function() {
		packageInstaller = new PackageInstaller();
	})

	describe('correct input', function() {

		var correctInput = ['KittenService: ','Leetmeme: Cyberportal','Cyberportal: Ice','CamelCaser: KittenService','Fraudstream: Leetmeme','Ice: '];
		var correctOutput = 'KittenService, Ice, Cyberportal, Leetmeme, CamelCaser, Fraudstream';

		it('should return correct output', function(done) {
			var result = packageInstaller.getInstallationList(correctInput);
			result.should.be.equal(correctOutput);
			done();
		})

	})

	describe('empty input', function() {
		
		var emptyInput = [];

		it('should return an empty string', function(done) {
			var result = packageInstaller.getInstallationList(emptyInput);
			result.should.be.equal('');
			done();
		})

	})

	describe('circular input', function() {

		var circularInput = ['KittenService: ','Leetmeme: Cyberportal','Cyberportal: Ice','CamelCaser: KittenService','Fraudstream: ','Ice: Leetmeme'];
		
		it('should throw an exception', function(done) {
			should(function() {packageInstaller.getInstallationList(circularInput)}).throw('Found Circular Dependencies');
			done();
		})

	})

	describe('invalid argument', function() {

		it('should throw invalid argument exception', function(done) {
			should(function() {packageInstaller.getInstallationList(null)}).throw('Invalid Argument');
			done();
		})
		
	})

})
