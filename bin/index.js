#!/usr/bin/env node

try {

require("yargs")
	.scriptName("include")
	.parserConfiguration({ "boolean-negation": false })
	.usage("Usage: $0 <command> [options?] ")

	.command({
		command: "check",
		handler: () => {
			require('./cli/check.js').check();
		}
	})

	.command({
		command: "map",
		handler: () => {
			require('./cli/mapper.js').map();
		}
	})
	.argv;

} catch (e) { require('../lib/core/error-handler').handle(e)  }