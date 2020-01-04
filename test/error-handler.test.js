const fse = require('fs-extra');

const include  = require('../index.js');

const ORIG_DIR = process.cwd();


beforeAll(() => { 
	process.chdir('test/error-handler-data'); 
	{
		const INCLUDEMAP_BP = require('../lib/blueprints/includemap.bp.json');
		process.env.LIBROOT_KW = INCLUDEMAP_BP['library-root'].keyword;
		process.env.MAP_KW 		 = INCLUDEMAP_BP['map'].keyword;
	}
});

afterAll(()  => { 
	process.chdir(ORIG_DIR); 
});


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
	const { LIBROOT_KW, MAP_KW } = process.env;

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