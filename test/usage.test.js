const include  = require('../index.js');

const ORIG_DIR = process.cwd();

beforeAll(() => {
	process.chdir('test/usage-data');
});

afterAll(() => {
	process.chdir(ORIG_DIR);
});


describe('Testing overall usage with sample usage-data/.includemap', () => {	

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