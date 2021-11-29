const axios = require('axios');
const { RPC_URLS } = require('../config/RPCConfig');

const buildURL = (ip) => `http://${ip}:7777/rpc`;

const randomURLIndex = (rpcList) => Math.floor(Math.random() * rpcList.length);

const getRPCURL = async (rpcURLList = RPC_URLS) => {
	// random a rpc url
	const rpcURLIndex = randomURLIndex(rpcURLList);

	const ip = rpcURLList[rpcURLIndex] && rpcURLList[rpcURLIndex].ip;
	// Throw exception can't reach nodes
	if (!ip) {
		throw 'Can not reach all default nodes!';
	}
	let url;
	try {
		url = buildURL(ip);
		console.info(`Ping ${url}`);
		await axios.get(url, { timeout: 2000 });
		console.info(`${url} ok!`);
		return url;
	} catch (error) {
		console.info(`Can not reach ${url}. Request was aborted! Go next!`);
		return getRPCURL(
			rpcURLList.filter((rpc, i) => {
				return rpcURLIndex !== i;
			}),
		);
	}
};

module.exports = {
	getRPCURL,
};
