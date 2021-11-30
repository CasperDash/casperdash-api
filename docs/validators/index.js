module.exports = {
	'/validators': {
		get: {
			tags: ['Validators'],
			summary: 'Get validators information',
			description: 'Get validators information ',
			operationId: 'getValidatorsInfo',
			responses: {
				200: {
					description: 'Validators information',
					content: {
						'application/json': {
							schema: {
								type: 'array',
								items: {
									$ref: '#/components/schemas/Validator',
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
