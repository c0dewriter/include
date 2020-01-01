/** Basically, the core. 
	* Reads .includemap and translates the requested library accordingly.
	*
	* @param _MAP is the "_MAP" entry in .includemap file.
	* @param _LIBROOT is the absolute path to the library root (read from .includemap)
	* @param lib is the requested library by the user (e.g. include("$tensorflow")).
	* @return the absolute translated path to @param lib
*/
function _translate(_MAP, _LIBROOT, lib) {
	let resolved = lib;

	while(resolved.indexOf("$") !== -1) {
		let shards = resolved.split("/");
		
		for(let i = 0; i < shards.length; i++) {
			if(shards[i].indexOf("$") === -1)
				continue;

			/*
				While designing .includemap, I had a feeling that I needed to define _LIBROOT 
				outside of the "_MAP" entry. I do not know the reason for this yet.
				But if I had to give an explanation, It would be.. flexibility?
			*/
			if(shards[i] === "$_LIBROOT") {
				resolved = resolved.replace("$_LIBROOT", _LIBROOT);
				break;
			}

			resolved = resolved.replace(shards[i], _MAP[shards[i].slice(1)]) ;
			break;
		}

	}

	return resolved;
}

/** This is it. The reason behind the seperation of _translate()
	* and resolve(), is flexibility in case it was ever needed.
	*	
	* @param absMapDir is the absolute path to .includemap file.
	* @param lib is the requested library by the user (e.g. include("$tensorflow")).
	* @return the absolute translated path to @param lib
*/
function resolve(absMapDir, lib) {
	const fse = require('fs-extra');
	const { _MAP, _LIBROOT } = fse.readJsonSync( absMapDir );

	return _translate( _MAP, _LIBROOT, lib )
}


module.exports = {
	resolve
}