#!/usr/bin/env node

try {
	require('../lib/core/env').setIncludeMap();

	require('yargs')
		.strict()
		.scriptName('include')
		.parserConfiguration({ 'boolean-negation': false })
		.demandCommand(1, 'No commands specified.')
		.usage('Usage: $0 <command> [options?] ')

		.command({
			command: 'check',
			describe: 'Check .includemap\'s existence and readability',
			handler: () => {
				require('../lib/cli/check.js').check();
			}
		})

		.command({
			command: 'map',
			describe: 'Generate an include map based on a library folder',
			// builder: {
			// 	'l': {
			// 		alias: 'limit-to',
			// 		demandOption: false,
			// 		choices: ['folders', 'files', 'nothing'],
			// 		describe: 'Limit what things to map',
			// 		default: 'nothing',
			// 		type: 'string'
			// 	}
			// },

			handler: () => require('../lib/cli/mapper.js').map()
		})

		
		.showHelpOnFail(false, 'Use --help for available commands and their options')
		.help('help').alias('h', 'help')
		.version().alias('v', 'version')
		// .epilogue('For more information, visit: https://github.com/c0dewriter/include-nodejs#readme')
		.argv;

} catch (e) { require('../lib/core/error-handler').handle(e);  }