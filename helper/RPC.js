const axios = require('axios');
const { MAIN_NET_RPC_URLS } = require('../config/RPCConfig');

const buildURL = (ip) => `http://${ip}:7777/rpc`;

const getRPCURL = async (ipIndex = 0) => {
	let url;
	try {
		const ip = MAIN_NET_RPC_URLS[ipIndex] && MAIN_NET_RPC_URLS[ipIndex].ip;
		if (!ip) {
			console.info(`Can not reach all default node! return ${buildURL(MAIN_NET_RPC_URLS[0].ip)}`);
			return MAIN_NET_RPC_URLS[0].ip;
		}
		url = buildURL(ip);
		console.info(`Ping ${url}`);
		await axios.get(url, { timeout: 2000 });
		console.info(`${url} ok!`);
		return url;
	} catch (error) {
		console.info(`Can not reach ${url}. Request was aborted! Go next!`);
		return getRPCURL(ipIndex + 1);
	}
};
getRPCURL();
module.exports = {
	getRPCURL,
};
