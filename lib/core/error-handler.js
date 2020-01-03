const colors = require('colors');

/** A very basic error handler. Minimalistically designed only for include.
	*
	* @param e {object} is the error being passed down from the index.js
	* @return {void}
*/

function handle(e) {
	console.log();

	switch (true) {
	
	/* 
		Thrown by: 
			- @fs-extra's readJsonSync when it can't find .includemap
	*/
	case (e.code === 'ENOENT'):
		console.log(colors.red('> FATAL: Could not find .includemap'));
		console.log(
			'> Please make sure your Node\'s working directory is the same as .includemap');
		break;

	/* 
		Thrown by:
			- @fs-extra's readJsonSync when it can't parse the JSON file.
			- <_prepareIncludeMap()> in case: 
				-- library-root is undefined
				-- map is undefined
	*/
	case (e instanceof SyntaxError):
		console.log(colors.red('> FATAL: Invalid .includemap map'));
		break;

	default:
		console.log(colors.red('> FATAL: Something went wrong'));
	}

	console.log(colors.yellow('> Details: \n'));
	throw e;
}


module.exports = {
	handle,
};