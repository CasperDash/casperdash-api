module.exports = {
	apps: [
		{
			name: 'casperdash-api',
			script: 'bin/www',
			env_production: {
				NODE_ENV: 'mainnet',
			},
			env_staging: {
				NODE_ENV: 'testnet',
			},
		},
	],
};
