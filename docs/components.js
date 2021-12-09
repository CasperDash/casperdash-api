module.exports = {
	components: {
		schemas: {
			Error: {
				description: 'API error',
				type: 'object',
				properties: {
					message: {
						type: 'string',
					},
				},
			},
			Account: {
				description: 'Account information',
				type: 'object',
				properties: {
					_accountHash: {
						type: 'string',
					},
					namedKeys: {
						type: 'array',
						items: {
							type: 'object',
						},
					},
					mainPurse: { type: 'string' },
					associatedKeys: {
						type: 'array',
						items: {
							type: 'object',
						},
					},
					actionThresholds: {
						type: 'object',
						properties: {
							deployment: { type: 'integer' },
							keyManagement: { type: 'integer' },
						},
					},
				},
			},
			Token: {
				description: 'Token information',
				type: 'object',
				properties: {
					address: {
						type: 'string',
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
			Validator: {
				description: 'Validator information',
				type: 'object',
				properties: {
					public_key: {
						type: 'string',
					},
					weight: {
						type: 'integer',
					},
					bidInfo: {
						type: 'object',
						properties: {
							public_key: {
								type: 'string',
							},
							bid: {
								type: 'object',
							},
						},
					},
				},
			},
		},
	},
};
