#!/usr/bin/env node

function include(lib) 
{
	try { 
		return require('./lib/includemap').resolve(lib) } 

	catch (e) { 
		require('./lib/error-handler').handle(e) }
}


console.log(include("$common/printer"));


module.exports = include;