module.exports = {
	'/tokens/getTokensInfo': {
		get: {
			tags: ['Token'],
			summary: 'Get Token Info with balance',
			description: 'Get Token Info with balance',
			operationId: 'getTokensInfo',
			parameters: [
				{
					name: 'tokenAddress',
					in: 'query',
					description: 'Tokens Address',
					schema: {
						type: 'array',
						items: {
							type: 'string',
						},
					},
					required: true,
				},
				{
					name: 'publicKey',
					in: 'query',
					description: 'Public Key',
					schema: {
						type: 'string',
					},
				},
			],
			responses: {
				200: {
					description: 'Token Info with balance',
					content: {
						'application/json': {
							schema: {
								type: 'object',
								properties: {
									address: {
										type: 'string',
									},
									balance: {
										type: 'object',
									},
									decimals: {
										type: 'object',
									},
									name: {
										type: 'string',
									},
									symbol: {
										type: 'string',
									},
									total_supply: {
										type: 'object',
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
	'/token/{tokenAddress}': {
		get: {
			tags: ['Token'],
			summary: 'Get Token information',
			description: 'Get token information e.g Name, Symbol, Supply',
			operationId: 'getTokenInfo',
			parameters: [
				{
					name: 'tokenAddress',
					in: 'path',
					description: 'Token address',
					schema: {
						type: 'string',
					},
					required: true,
				},
			],
			responses: {
				200: {
					description: 'Token information',
					content: {
						'application/json': {
							schema: {
								$ref: '#/components/schemas/Token',
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
