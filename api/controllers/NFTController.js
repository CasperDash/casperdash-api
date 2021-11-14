const { getNFTInfo } = require('../services/NFTServices');

module.exports = {
	getNFTs: async (req, res) => {
		try {
			const { tokenAddress, publicKey } = req.query;
			if (!tokenAddress || !publicKey) {
				res.json([]);
			}
			const addresses = Array.isArray(tokenAddress) ? tokenAddress : [tokenAddress];
			const NFTInfo = await getNFTInfo(addresses, publicKey);
			res.json(NFTInfo);
		} catch (err) {
			res.json(err);
		}
	},
};
