module.exports = {
	'/nfts/getNFTsInfo': {
		get: {
			tags: ['NFTs'],
			summary: 'Get NFTs Info ',
			description: 'Get NFTs Info by public key',
			operationId: 'getNFTsInfo',
			parameters: [
				{
					name: 'tokenAddress',
					in: 'query',
					description: 'NFTs Address',
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
					required: true,
				},
			],
			responses: {
				200: {
					description: 'NFT info',
					content: {
						'application/json': {
							schema: {
								type: 'object',
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
