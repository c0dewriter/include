const fse = require('fs-extra');

const include  = require('../index.js');

const INCLUDEMAP_BP = require('../lib/blueprints/includemap.bp.json');
const ORIG_DIR = process.cwd();


beforeAll(() => { process.chdir('test/error-handler-data'); });
afterAll(()  => { process.chdir(ORIG_DIR); });


describe('.includemap: to be or not to be', () => {
	beforeAll(() => {
		if(fse.existsSync('.includemap'))
			fse.removeSync('.includemap');
	});


	test('not to be', () => {
		expect(() => { 
			include('$pickle');
		}).toThrowError(/ENOENT/);
	});

});


describe('.includemap: undefined entries', () => {
	const LIBROOT_KW = INCLUDEMAP_BP['library-root'].keyword;
	const MAP_KW		 = INCLUDEMAP_BP['map'].keyword;

	beforeAll(() => {
		fse.outputJsonSync('.includemap', {
			'library-root': './lib',
			'map': {
				'common': '$library-root',
				'banana': '$common/banana.js'
			}
		}, { spaces: 2 });
	});

	afterAll(() => { fse.removeSync('.includemap'); });

	
	test(`Undefined ${LIBROOT_KW}`, () => {
		expect(() => {
			include(`$${LIBROOT_KW}`);
		}).toThrowError(SyntaxError);
	});

	test(`Undefined ${MAP_KW}`, () => {
		expect(() => {
			include('$common');
		}).toThrowError(SyntaxError);
	});

});