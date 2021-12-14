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
			},
		},
	],
};
