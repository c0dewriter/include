/** We are assuming that the <.includemap> file is located at the root of the
	* node working directory. Which is where the user's project, package.json and 
	* other configuration files will be. Hopefully.
	*
*/
const includemapDir = `${process.cwd()}/.includemap`;


function _prepareIncludeMap(lib) {
	const fse = require("fs-extra");
	
	// Since .includemap is not a JSON "file", <require()> won't treat it as one.
	let contents = fse.readJsonSync( includemapDir );

	if (!contents._LIBROOT.trim()) 
		throw SyntaxError("Invalid _LIBROOT value in .includemap")
}


function interpret(lib)  {
	_prepareIncludeMap(lib);

	return require('./resolver').resolve(includemapDir, lib);
}


module.exports = {
	interpret,
};