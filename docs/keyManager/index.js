module.exports = {
	'/keyManager/{publicKey}': {
		get: {
			tags: ['Key Manager'],
			summary: 'Get account information',
			description: 'Get account information by public key',
			operationId: 'getKeyManager',
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
	'/getKeysManagerDeploy': {
		get: {
			tags: ['Key Manager'],
			summary: 'Get key manager deployed contract',
			description: 'Get sample key manager deployed contract details which already deployed on network',
			operationId: 'getKeysManagerDeploy',
			responses: {
				200: {
					description: 'Key manager contract',
					content: {
						'application/json': {},
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
	'/deployKeyManagerContract': {
		post: {
			tags: ['Key Manager'],
			summary: 'Deploy key manager contract',
			description: 'Deploy key manager contract',
			operationId: 'deployKeyManagerContract',
			requestBody: {
				content: {
					'application/json': {},
				},
			},
			responses: {
				200: {
					description: 'Put deploy successfully',
					content: {
						'application/json': {
							schema: {
								type: 'object',
								properties: {
									deployHash: {
										type: 'string',
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
};
