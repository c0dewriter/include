process.chdir('test/data');

const include = require('../index.js');


describe('Testing overall usage with .mock.includemap', () => {
	
	test('include("$_LIBROOT")', () => {
		expect( include('$_LIBROOT', true) )
			.toBe('./lib');
	});

	test('include("$print")', () => {
		expect( include('$print', true) )
			.toBe('./lib/print.js');
	});

	test('include("$templates")', () => {
		expect( include('$templates', true) )
			.toBe('./lib/templates');
	});

	test('include("$QTemplates")', () => {
		expect( include('$QTemplates', true) )
			.toBe('./lib/templates/Q');
	});

	test('include("$QDatabase")', () => {
		expect( include('$QDatabase', true) )
			.toBe('./lib/templates/Q/database.json');
	});

});