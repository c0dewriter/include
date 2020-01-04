const fse  	 = require('fs-extra');
const colors = require('colors');

const { LIBROOT_KW, MAP_KW, INCLUDEMAP_DIR } = process.env;


function doesIncludeMapExist(raiseException=true) {
	if (fse.existsSync( INCLUDEMAP_DIR ))
		return true;

	if (raiseException === true) {
		let err = new Error(`.includemap does not exist at ${INCLUDEMAP_DIR}`);
		err.code = 'ENOENT';
		
		throw err;
	}

	{
		console.log('>', colors.yellow('.includemap does not exist.'));
		return false;
	}
}


function isIncludeMapValid(raiseException=true) {
	// will be handled by error-handler if there are any syntatical errors
	const contents = fse.readJsonSync( INCLUDEMAP_DIR );

	const libraryRoot = contents[LIBROOT_KW]; 
	const mapEntries  = contents[MAP_KW]; 

	if ( libraryRoot === undefined )
		if (raiseException === true)
			throw SyntaxError(`Could not resolve '${LIBROOT_KW}' in .includemap`);
		else 
			return false;
	
	if ( fse.pathExistsSync(libraryRoot) === false )
		if (raiseException === true)
			throw SyntaxError(`Path '${libraryRoot}' does not exist`);
		else 
			return false;

	if ( mapEntries === undefined )
		if(raiseException === true)
			throw SyntaxError(`Could not resolve '${MAP_KW}' in .includemap`);
		else
			return false;
	
	return true;
}


function check() {
	if ( doesIncludeMapExist() ) {
		console.log(colors.green('> Found .includemap:'), INCLUDEMAP_DIR);
	}
	
	if ( isIncludeMapValid() )
		console.log(colors.green('> Include map looks good'));

	// TODO :: Check all the defined keywords in .includemap (after implementing the mapper)

	return true;
}


module.exports = { 
	check, 
	doesIncludeMapExist, 
	isIncludeMapValid 
};

