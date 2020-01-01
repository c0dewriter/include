#!/usr/bin/env node

/**
	While being fully aware that using <require()> inside functions is not a good practice,
	I Still decided do it as I was worried the synchronous nature of require, would cause 
	performance issues in the long run.
*/
function include(lib) 
{
	try { 
		return require( require('./lib/core/includemap').interpret(lib) ) }

	catch (e) { 
		require('./lib/core/error-handler').handle(e) }
}

include('$printer')

module.exports = include;