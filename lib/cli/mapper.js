const fse 	= require('fs-extra');
const check = require('./check.js');

const { LIBROOT_KW, MAP_KW, INCLUDEMAP_DIR } = process.env;

function createIncludeMapFile() {
	const prompt = require('./prompt.js');
	// the 'exitIfFalse' makes sure that we get a 'yes". so there's no need to check.
	prompt.willCreateIncludeMap( true );

	fse.outputJsonSync(INCLUDEMAP_DIR, { 
		[LIBROOT_KW]: prompt.libraryRootDir(), 
		[MAP_KW]: {} 
	}, { spaces: 2 });	
}


function map() {
	if ( check.doesIncludeMapExist(false) === false )
		createIncludeMapFile();

	check.isIncludeMapValid(true);

}


module.exports = { map };