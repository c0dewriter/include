const include  = require('../index.js');

const ORIG_DIR = process.cwd();

beforeAll(() => {
	process.chdir('test/error-handler-data');
});

afterAll(() => {
	process.chdir(ORIG_DIR);
});


describe('.includemap: to be or not to be', () => {

	test('not to be', () => {
		expect(() => { 
			include('$pickle');
		}).toThrowError(/ENOENT/);
	});

});


// describe('.includemap: undefined entries', () => {
	
// });