module.exports = {
	'/user/{publicKey}': {
		get: {
			tags: ['Account Info'],
			summary: 'Get account information',
			description: 'Get account information by public key',
			operationId: 'getAccount',
			parameters: [
				{
					name: 'publicKey',
					in: 'path',
					description: 'Public key',
					schema: {
						type: 'string',
					},
					required: true,
				},
			],
			responses: {
				200: {
					description: 'Account information',
					content: {
						'application/json': {
							schema: {
								$ref: '#/components/schemas/Account',
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
