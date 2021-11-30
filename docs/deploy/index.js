module.exports = {
	'/deploy': {
		// method of operation
		post: {
			tags: ['Deploy'], // operation's tag.
			description: 'Deploy transaction', // operation's desc.
			operationId: 'deploy', // unique operation id.
			parameters: [], // expected params.
			requestBody: {
				content: {
					'application/json': {},
				},
			},
			responses: {
				// response code
				200: {
					description: 'Put deploy successfully',
					content: {
						// content-type
						'application/json': { hash: 'string' },
					},
				},
				500: {
					description: 'Error',
					content: {
						'application/json': {
							schema: {
								$ref: '#/components/schemas/Error',
							},
						},
					},
				},
			},
		},
	},
	'/deploysStatus': {
		// method of operation
		get: {
			tags: ['Deploy'], // operation's tag.
			summary: 'Get deploys status',
			description: 'Get status for list of provided deploy hash', // operation's desc.
			operationId: 'getDeployStatus', // unique operation id.
			produces: ['application/json'],

			parameters: [
				{
					name: 'deployHash',
					in: 'query',
					description: 'List of deploy hash',
					schema: {
						type: 'array',
						items: {
							type: 'string',
						},
					},
					required: true,
				},
			], // expected params.
			responses: {
				// response code
				200: {
					description: 'Deploy hashes with status',
					content: {
						'application/json': {
							schema: {
								type: 'array',
								items: {
									type: 'object',
									properties: {
										hash: { type: 'string' },
										status: { type: 'string' },
									},
								},
							},
						},
					},
				},
				500: {
					description: 'Error',
					content: {
						'application/json': {
							schema: {
								$ref: '#/components/schemas/Error',
							},
						},
					},
				},
			},
		},
	},
	'/getLatestBlockHash': {
		// method of operation
		get: {
			tags: ['Deploy'], // operation's tag.
			summary: 'Get latest block hash',
			description: 'Get latest block hash', // operation's desc.
			operationId: 'getLatestBlockHash', // unique operation id.
			responses: {
				// response code
				200: {
					description: 'Latest block hash',
					content: {
						'application/json': {
							schema: {
								type: 'object',
								properties: {
									latestBlockHash: { type: 'string' },
								},
							},
						},
					},
				},
				500: {
					description: 'Error',
					content: {
						'application/json': {
							schema: {
								$ref: '#/components/schemas/Error',
							},
						},
					},
				},
			},
		},
	},
};
