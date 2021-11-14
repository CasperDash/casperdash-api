module.exports = {
	apps: [
		{
			name: 'casperdash-api',
			script: 'bin/www',
			env_production: {
				NODE_ENV: 'production',
				RPC_URL: 'http://134.209.110.11:7777/rpc',
			},
			env_staging: {
				NODE_ENV: 'staging',
			},
		},
	],
};
