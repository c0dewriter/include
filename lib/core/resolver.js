const { LIBROOT_KW, MAP_KW, INCLUDEMAP_DIR } 	= process.env;

/** Basically, the core. 
	* Reads .includemap and translates the requested library accordingly.
	*
	* @param mapEntries {object} is the map entry in .includemap file.
	* @param librootDir {string} is the absolute path to the library root (read from .includemap)
	* @param lib {string} is the requested library by the user (e.g. include("$tensorflow")).
	* @return {string} the absolute translated path to @param lib
*/
function _translate(mapEntries, librootDir, lib) {
	let resolved = lib;

	while(resolved.indexOf('$') !== -1) {
		let shards = resolved.split('/');
		
		for(let i = 0; i < shards.length; i++) {
			if(shards[i].indexOf('$') === -1)
				continue;

			/*
				While designing .includemap, I had a feeling that I needed to define library-root 
				outside of the "mapEntries" entry. I do not know the reason for this yet.
				But if I had to give an explanation, It would be.. flexibility?
			*/
			if(shards[i] === `$${LIBROOT_KW}`) {
				resolved = resolved.replace(`$${LIBROOT_KW}`, librootDir);
				break;
			}

			resolved = resolved.replace(shards[i], mapEntries[shards[i].slice(1)]) ;
			break;
		}

	}

	return resolved;
}

/** This is it. The reason behind the seperation of _translate()
	* and resolve(), is flexibility in case it was ever needed.
	*	
	* @param lib {string} is the requested library by the user (e.g. include("$tensorflow")).
	* @return {string} the absolute translated path to @param lib
*/
function resolve(lib) {
	const contents = require('fs-extra').readJsonSync( INCLUDEMAP_DIR );

	const librootDir = contents[LIBROOT_KW];
	const mapEntries = contents[MAP_KW];

	return _translate( mapEntries, librootDir, lib );
}


module.exports = {
	resolve
};