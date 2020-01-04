const include  = require('../index.js');

const ORIG_DIR = process.cwd();

beforeAll(() => {
	process.chdir('test/usage-data');
});

afterAll(() => {
	process.chdir(ORIG_DIR);
});


describe('Testing overall usage with sample usage-data/.includemap', () => {	
	beforeAll(() => {
		process.env.NODE_ENV = '__test__';
	});

	afterAll(() => {
		delete process.env.NODE_ENV;
	});


	test('include("$_LIBROOT")', () => {
		expect( include('$_LIBROOT') )
			.toBe('./lib');
	});

	test('include("$print")', () => {
		expect( include('$print') )
			.toBe('./lib/print.js');
	});

	test('include("$templates")', () => {
		expect( include('$templates') )
			.toBe('./lib/templates');
	});

	test('include("$QTemplates")', () => {
		expect( include('$QTemplates') )
			.toBe('./lib/templates/Q');
	});

	test('include("$QDatabase")', () => {
		expect( include('$QDatabase') )
			.toBe('./lib/templates/Q/database.json');
	});

});