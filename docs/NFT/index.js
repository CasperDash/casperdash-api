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
	'/nfts/{publicKey}/NFTContracts': {
		get: {
			tags: ['NFTs'],
			summary: 'Get own NFT contracts ',
			operationId: 'getOwnNFTContracts',
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
					description: 'NFT contracts',
					content: {
						'application/json': {
							schema: {
								type: 'array',
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
	'/nfts/contract/:contractAddress': {
		get: {
			tags: ['NFTs'],
			summary: 'Get NFT contract info',
			operationId: 'getNFTContractInfo',
			parameters: [
				{
					name: 'contractAddress',
					in: 'path',
					description: 'Contract Address',
					schema: {
						type: 'string',
					},
					required: true,
				},
			],
			responses: {
				200: {
					description: 'NFT contract Info',
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
	'/nfts/getNFTContractDeploy': {
		get: {
			tags: ['NFTs'],
			summary: 'Get NFT sample contract deploy',
			operationId: 'getNFTContractDeploy',
			responses: {
				200: {
					description: 'NFT contract Info',
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
