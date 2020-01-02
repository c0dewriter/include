#!/usr/bin/env node

try {

require("yargs")
	.scriptName("include")
	.parserConfiguration({ "boolean-negation": false })
	.usage("Usage: $0 <command> [options?] ")

	.command({
		command: "check",
		describe: "Check .includemap's existence and readability",
		handler: () => {
			require('./cli/check.js').check();
		}
	})
	// .command({
	// 	command: "map",
	// 	handler: () => {
	// 		require('./cli/mapper.js').map();
	// 	}
	// })
	.help('help').alias('h', 'help')
	.version()
	.argv;

} catch (e) { require('../lib/core/error-handler').handle(e)  }