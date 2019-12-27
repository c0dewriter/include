function _translate(map, _LIBROOT, lib) {
	let resolved = lib;

	while(resolved.indexOf("$") !== -1) {
		let shards = resolved.split("/");
		
		for(let i = 0; i < shards.length; i++) {
			if(shards[i].indexOf("$") === -1)
				continue;

			if(shards[i] === "$_LIBROOT") {
				resolved = resolved.replace("$_LIBROOT", _LIBROOT);
				break;
			}

			resolved = resolved.replace(shards[i], map[shards[i].slice(1)]) ;
			break;

		}

	}

	return resolved;
}


function resolve(absMapDir, lib) {
	const fse = require('fs-extra');
	const { map, _LIBROOT } = fse.readJsonSync( absMapDir );

	return _translate( map, _LIBROOT, lib )
}


module.exports = {
	resolve
}