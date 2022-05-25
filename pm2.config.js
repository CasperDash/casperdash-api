module.exports = {
	apps: [
		{
			name: 'casperdash-api',
			script: 'bin/www',
			env_production: {
				NODE_ENV: 'mainnet',
				NFT_STORAGE_API_TOKEN: process.env.NFT_STORAGE_API_TOKEN,
			},
			env_staging: {
				NODE_ENV: 'testnet',
				NFT_STORAGE_API_TOKEN: process.env.NFT_STORAGE_API_TOKEN,
				PARTNERSHIP_VALIDATORS: [
					{
						public_key: '01028e248170a7f328bf7a04696d8f271a1debb54763e05e537eefc1cf24531bc7',
						name: 'OriginStake - Only 1% fee until May 15 🔥🔥',
						logo: 'https://originstake.com/.well-known/casper/originstake_logo_vali_256.png',
						priority: 10,
					},
				],
			},
			interpreter: 'node@14.18.2', // Only need to set the node version here. NVM will automatically update node engine on server.
		},
	],
};
