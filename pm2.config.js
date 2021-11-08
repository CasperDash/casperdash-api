module.exports = {
	apps: [
		{
			name: 'casperdash-apo',
			env_production: {
				NODE_ENV: 'production',
				TESTNET_RPC_URL: 'http://3.225.191.9:7777/rpc',
			},
			env_development: {
				NODE_ENV: 'development',
			},
		},
	],
};
