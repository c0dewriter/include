const readl = require('readline-sync');


function willCreateIncludeMap(exitIfFalse=false) {
	// TODO :: replace with `.keyIn`? To avoid users entering something irrelevant?
	const trueValue 	= ['yes', 'y', 'yeah', 'ya', 'yea', 'yes!', 'ja', 'Y'];
	const falseValue	= ['no', 'n', 'nah', 'na', 'no!', 'niet', 'N'];

	const response = readl.question('Should we create it for you? [Y|n]: ', { 
		trueValue, 
		falseValue, 
		defaultInput: 'Y' 
	});

	if ( response ===  false && exitIfFalse )
		process.exit();

	return true;
}


function libraryRootDir() {
	const defaultDir = require('../blueprints/includemap.bp.json')['library-root']['default'];

	const response = readl.questionPath(`Library root? [${defaultDir}]: `, {
		isDirectory: true,
		cd: false,
		create: false,
		defaultInput: defaultDir.replace('$PWD', process.cwd())
	});

	return response;
}


module.exports = {
	willCreateIncludeMap,
	libraryRootDir,
};