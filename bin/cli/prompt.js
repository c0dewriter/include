function willCreateIncludeMap(exitIfFalse=false) {
	const readl = require('readline-sync');
	const trueValue 	= ['yes', 'y', 'yeah', 'ya', 'yea', 'yes!', 'ja', 'Y'];
	const falseValue	= ['no', 'n', 'nah', 'na', 'no!', 'niet', 'N'];

	const response = readl.question('Should we create it for you? [Y/n]: ', { 
		trueValue, 
		falseValue, 
		defaultInput: 'Y' 
	});

	if ( response ===  false && exitIfFalse )
		process.exit();

	return true;
}


module.exports = {
	willCreateIncludeMap,
};