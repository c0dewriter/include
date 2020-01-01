const fse  	= require('fs-extra');
const path 	= require('path');
const colors = require('colors');

const INCLUDEMAP_DIR = path.join(process.cwd(), '.includemap');

/*
function _promptCreateIncludeMap() {
	const readl = require('readline-sync');
	const trueValues 	= ['yes', 'y', 'yeah', 'ya', 'yea', 'yes!', 'ja', 'Y'];
	const falseValues	= ['no', 'n', 'nah', 'na', 'no!', 'niet', 'N'];

	return readl.question('Should we create it for you? [Y/n]:', { 
		trueValues, 
		falseValues, 
		defaultInput: 'Y' 
	});

}
*/

function _doesIncludeMapExist() {
	if (fse.existsSync( INCLUDEMAP_DIR ))
		return true;

	let err = new Error(`.includemap does not exist at ${INCLUDEMAP_DIR}`);
	err.code = "ENOENT";
	
	throw err;
}


function _isIncludeMapValid() {
	// will be handled by error-handler if there are any syntatical errors
	const contents = fse.readJsonSync( INCLUDEMAP_DIR );

	const _LIBROOT 	= contents['_LIBROOT']; 
	const _MAP 		 	= contents['_MAP']; 

	if ( _LIBROOT === undefined )
		throw SyntaxError("Could not resolve '_LIBROOT' in .includemap");
	
	if ( fse.pathExistsSync(_LIBROOT) === false )
		throw SyntaxError(`Path '${_LIBROOT}' does not exist`);

	if ( _MAP === undefined )
		throw SyntaxError("Could not resolve '_MAP' in .includemap");
	
	return true;
}


function check() {
	if ( _doesIncludeMapExist() ) {
		console.log(colors.green("> Found .includemap:"), INCLUDEMAP_DIR);
		
	}
	
	if ( _isIncludeMapValid() )
		console.log(colors.green("> Include map looks good"));

	// TODO :: Check all the defined keywords in .includemap (after implementing the mapper)

	return true;
}


module.exports = { check };

