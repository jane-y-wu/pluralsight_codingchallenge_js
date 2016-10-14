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

		it ('should return correct output for single package', function(done) {

			var correctInput = ['A: '];
			var correctOutput = 'A';

			var result = packageInstaller.getInstallationList(correctInput);
			result.should.be.equal(correctOutput);
			done();

		})

		it ('should return correct output for single pairing', function(done) {

			var correctInput = ['A: B'];
			var correctOutput = 'B, A';

			var result = packageInstaller.getInstallationList(correctInput);
			result.should.be.equal(correctOutput);
			done();

		})

		it ('should return correct output for redundant pairing', function(done) {

			var correctInput = ['A: B', 'A: B', 'A: B', 'A: B'];
			var correctOutput = 'B, A';

			var result = packageInstaller.getInstallationList(correctInput);
			result.should.be.equal(correctOutput);
			done();

		})

		it ('should return correct output for multiple dependencies', function(done) {

			var correctInput = ['A: B', 'A: C'];
			var correctOutput = 'B, C, A';

			var result = packageInstaller.getInstallationList(correctInput);
			result.should.be.equal(correctOutput);
			done();

		})

		it('should return correct output even with extra spaces', function(done) {

			var correctInput = ['A: B','C:  D','D : E'];
			var correctOutput = 'B, A, E, D, C';

			var result = packageInstaller.getInstallationList(correctInput);
			result.should.be.equal(correctOutput);
			done();

		})

		it('should return correct output for extremely long package list', function(done) {

			var correctInput = ['C: D','A: B','D: E','A: B','A: C','A: ','E: F','F: G','B: C','A: Z','F: Y','E: W', 'S: T', 'M: N'];
			var correctOutput = 'G, Y, F, W, E, D, C, B, Z, A, T, S, N, M';

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

		it('should throw an exception for example circular input', function(done) {

			var circularInput = ['KittenService: ','Leetmeme: Cyberportal','Cyberportal: Ice','CamelCaser: KittenService','Fraudstream: ','Ice: Leetmeme'];

			should(function() {packageInstaller.getInstallationList(circularInput)}).throw('Found Circular Dependencies');
			done();
		})

		it('should throw an exception for two packages that depend on each other', function(done) {

			var circularInput = ['A: B', 'B: A'];

			should(function() {packageInstaller.getInstallationList(circularInput)}).throw('Found Circular Dependencies');
			done();
		})

		it('should throw an exception for three-way circular dependency', function(done) {

			var circularInput = ['A: B', 'B: C', 'C: A'];

			should(function() {packageInstaller.getInstallationList(circularInput)}).throw('Found Circular Dependencies');
			done();
		})

		it('should throw an exception for long list with cirular dependencies', function(done) {
			var circularInput = ['A: B','B: C','C: D','D: E','E: F','F: B'];

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

			var extraColonInput = ['KittenService: ','Leetmeme: : Cyberportal','Cyberportal: Ice'];

			should(function() {packageInstaller.getInstallationList(extraColonInput)}).throw('Invalid Argument: bad format');
			done();
		})

		it('should throw invalid argument exception from no colon', function(done) {

			var noColonInput = ['KittenService: ','Leetmeme Cyberportal','Cyberportal: Ice'];

			should(function() {packageInstaller.getInstallationList(noColonInput)}).throw('Invalid Argument: bad format');
			done();
		})

		it('should throw invalid argument exception from no space', function(done) {

			var noSpaceInput = ['KittenService: ','Leetmeme:Cyberportal','Cyberportal: Ice'];

			should(function() {packageInstaller.getInstallationList(noSpaceInput)}).throw('Invalid Argument: bad format');
			done();
		})

		it('should throw invalid argument exception because there is no dependent before dependency', function(done) {

			var noDependentInput = [' : KittenService','Leetmeme: Cyberportal','Cyberportal: Ice'];

			should(function() {packageInstaller.getInstallationList(noDependentInput)}).throw('Invalid Argument: bad format');
			done();
		})

		it('should throw invalid argument exception if dependent and dependency are the same', function(done) {

			var samePairInput = ['KittenService: KittenService'];

			should(function() {packageInstaller.getInstallationList(samePairInput)}).throw('Invalid Argument: dependent and dependency are the same');
			done();
		})

		it('should throw invalid argument exception if there is singular element without colon', function(done) {

			var singularInput = ['KittenService'];

			should(function() {packageInstaller.getInstallationList(singularInput)}).throw('Invalid Argument: bad format');
			done();
		})

		it('should throw invalid argument exception if element is not a string', function(done) {

			var notStringInput = [5];

			should(function() {packageInstaller.getInstallationList(notStringInput)}).throw('Invalid Argument: not a string');
			done();
		})

	})

})
