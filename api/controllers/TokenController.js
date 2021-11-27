const _ = require('lodash');
const TokenServices = require('../services/TokenServices');

module.exports = {
	getTokens: async (req, res) => {
		try {
			const { tokenAddress, publicKey } = req.query;
			if (!tokenAddress) {
				res.json([]);
			}
			const tokenServices = new TokenServices(req.RPC_URL);
			const balances = await tokenServices.getTokensBalanceByPublicKey(tokenAddress, publicKey);
			const tokensInfo = await tokenServices.getListTokenInfo(tokenAddress);
			res.json(_.merge(balances, tokensInfo).filter((token) => token.name));
		} catch (err) {
			res.json(err);
		}
	},
	getToken: async (req, res) => {
		try {
			const { tokenAddress } = req.params;
			const tokenServices = new TokenServices(req.RPC_URL);
			const tokenInfo = await tokenServices.getTokenInfo(tokenAddress);
			res.json(tokenInfo);
		} catch (error) {
			res.json(error);
		}
	},
};
