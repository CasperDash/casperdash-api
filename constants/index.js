const MOTE_RATE = 1000000000;
const RPC_URL = process.env.RPC_URL || 'http://194.163.151.76:7777/rpc';
const ERC20_TOKEN_ATTRS = ['name', 'symbol', 'total_supply', 'decimals'];

module.exports = {
	MOTE_RATE,
	RPC_URL,
	ERC20_TOKEN_ATTRS,
};
