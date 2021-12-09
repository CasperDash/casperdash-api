module.exports = {
	'/configuration': {
		// method of operation
		get: {
			tags: ['Configuration'], // operation's tag.
			description: 'Get configurations', // operation's desc.
			operationId: 'configuration', // unique operation id.
			parameters: [], // expected params.
			// expected responses
			responses: {
				// response code
				200: {
					description: 'Constant configurations', // response desc.
					content: {
						// content-type
						'application/json': {},
					},
				},
			},
		},
	},
};
