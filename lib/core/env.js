function setIncludeMap() {
	// by reading the library-root keyword from the blueprint, changing it becomes easier
	const includeMapBP  = require('../blueprints/includemap.bp.json');

	process.env.LIBROOT_KW = includeMapBP['library-root'].keyword;
	process.env.MAP_KW 		 = includeMapBP['map'].keyword;
	
	process.env.INCLUDEMAP_DIR = require('path').join(process.cwd(), '.includemap' );

}


module.exports = {
	setIncludeMap,
};