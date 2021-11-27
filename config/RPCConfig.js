// Current api server placed in Singapore, so prioritize Asia nodes first
// TODO: Should get all available nodes from RPC api
const MAIN_NET_RPC_URLS = [
	{ country: 'Singapore', ip: '134.209.110.11' },
	{ country: 'Singapore', ip: '68.183.226.35' },
	{ country: 'Vietnam', ip: '14.224.155.176' },
];
const TEST_NET_RPC_URLS = [
	{ ip: '65.21.237.153' },
	{ ip: '65.108.8.45' },
	{ ip: '161.97.155.213' },
	{ ip: '3.208.91.63:3' },
	{ ip: '109.205.181.161' },
];

module.exports = {
	RPC_URLS: process.env.NODE_ENV === 'testnet' ? TEST_NET_RPC_URLS : MAIN_NET_RPC_URLS,
};
