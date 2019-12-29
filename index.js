#!/usr/bin/env node

/**
	While being fully aware that using <require()> inside functions is not a good practice,
	I Still decided do it as I was worried the synchronous nature of require, would cause 
	performance issues in the long run.
*/
function include(lib) 
{
	try { 
		return require( require('./lib/includemap').interpret(lib) ) }

	catch (e) { 
		require('./lib/error-handler').handle(e) }
}

module.exports = include;