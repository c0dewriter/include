// const fse 	= require('fs-extra');
const check = require('./check.js');


function createIncludeMapFile() {
	// the 'exitIfFalse' makes sure that we get a 'yes". so there's no need to check.
	require('./prompt.js').willCreateIncludeMap( true );

}


function map() {
	if ( check.doesIncludeMapExist(false) === false )
		createIncludeMapFile();

	check.isIncludeMapValid(true);

}


module.exports = { map };