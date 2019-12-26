const fse = require('fs-extra');

function resolve(absMapDir, lib) {
	const { map, _LIBROOT } = fse.readJsonSync( absMapDir );
	
}


module.exports = {
	resolve
}