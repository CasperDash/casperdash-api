// Current api server placed in Singapore, so prioritize Asia nodes first
// TODO: Should get all available nodes from RPC api
const RPC_CONFIG = [
	{ country: 'Singapore', ip: '134.209.110.11' },
	{ country: 'Singapore', ip: '68.183.226.35' },
	{ country: 'Vietnam', ip: '14.224.155.176' },
];

module.exports = {
	RPC_CONFIG,
};
