/** We are assuming that the <.includemap> file is located at the root of the
	* node working directory. Which is where the user's project, package.json and 
	* other configuration files will be. Hopefully.
	*
*/
const INCLUDEMAP_DIR = `${process.cwd()}/.includemap`;

// by reading the library-root keyword from the blueprint, changing it becomes easier
const includeMapBP  = require('../blueprints/includemap.bp.json');
const LIBROOT_KW 	= includeMapBP['library-root'].keyword;
const MAP_KW 			= includeMapBP['map'].keyword;


function _prepareIncludeMap() {
	const fse = require('fs-extra');
	// Since .includemap is not a JSON "file", <require()> won't treat it as one.
	let contents = fse.readJsonSync( INCLUDEMAP_DIR );
	
	if ( contents[LIBROOT_KW] === undefined )
		throw SyntaxError(`Could not resolve '${LIBROOT_KW}' keyword in .includemap`);

	if ( contents[MAP_KW] === undefined ) 
		throw SyntaxError(`Could not resolve '${MAP_KW}' keyword in .includemap`);
}


function interpret(lib)  {
	_prepareIncludeMap();

	process.env.LIBROOT_KW = LIBROOT_KW;
	process.env.MAP_KW		 = MAP_KW;

	return require('./resolver').resolve(INCLUDEMAP_DIR, lib);
}


module.exports = {
	interpret,
};