#!/usr/bin/env node

/**
	While being fully aware that using <require()> inside functions is not a good practice,
	I Still decided do it as I was worried the synchronous nature of require, would cause 
	performance issues in the long run.
*/
function include(lib) 
{
	try 
	{ 
		require('./lib/core/env.js').setIncludeMap();

		const resolved = require('./lib/core/includemap').interpret(lib);

		if (process.env.NODE_ENV === '__test__')
			return resolved;
		
		return require(resolved);
	}

	catch (e) { 
		require('./lib/core/error-handler').handle(e); 
	}
}

module.exports = include;