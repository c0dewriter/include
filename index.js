#!/usr/bin/env node

function include(lib) 
{
	try { 
		return require( require('./lib/includemap').resolve(lib) );}

	catch (e) { 
		require('./lib/error-handler').handle(e) }
}


include("$_LIBROOT/common/printer").print();


module.exports = include;