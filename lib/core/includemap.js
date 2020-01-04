/** We are assuming that the <.includemap> file is located at the root of the
	* node working directory. Which is where the user's project, package.json and 
	* other configuration files will be. Hopefully.
	*
*/
const { LIBROOT_KW, MAP_KW, INCLUDEMAP_DIR } = process.env;


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

	return require('./resolver').resolve(lib);
}


module.exports = {
	interpret,
};