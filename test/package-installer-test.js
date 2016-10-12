var should = require('should');
var PackageInstaller = require('../lib/package-installer');

var packageInstaller;

describe('different types of outputs', function() {

	before(function() {
		packageInstaller = new PackageInstaller();
	})

	describe('correct input', function() {

		it('should return correct output', function(done) {

			var correctInput = ['KittenService: ','Leetmeme: Cyberportal','Cyberportal: Ice','CamelCaser: KittenService','Fraudstream: Leetmeme','Ice: '];
			var correctOutput = 'KittenService, Ice, Cyberportal, Leetmeme, CamelCaser, Fraudstream';

			var result = packageInstaller.getInstallationList(correctInput);
			result.should.be.equal(correctOutput);
			done();

		})

		it('should return correct output', function(done) {

			var correctInput = ['A: B','C: D','D: E'];
			var correctOutput = 'B, A, E, D, C';

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
		
		it('should throw invalid argument exception from null input', function(done) {
			should(function() {packageInstaller.getInstallationList(null)}).throw('Invalid Argument');
			done();
		})

		it('should throw invalid argument exception from extra colon', function(done) {

			var extraColonInput = ['KittenService: ','Leetmeme:: Cyberportal','Cyberportal: Ice'];

			should(function() {packageInstaller.getInstallationList(extraColonInput)}).throw('Invalid Argument');
			done();
		})

		it('should throw invalid argument exception from no colon', function(done) {

			var noColonInput = ['KittenService: ','Leetmeme Cyberportal','Cyberportal: Ice'];

			should(function() {packageInstaller.getInstallationList(noColonInput)}).throw('Invalid Argument');
			done();
		})

		it('should throw invalid argument exception from no space', function(done) {

			var noSpaceInput = ['KittenService: ','Leetmeme:Cyberportal','Cyberportal: Ice'];

			should(function() {packageInstaller.getInstallationList(noSpaceInput)}).throw('Invalid Argument');
			done();
		})

	})

})
