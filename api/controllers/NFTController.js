const NFTServices = require('../services/NFTServices');

module.exports = {
	getNFTs: async (req, res) => {
		try {
			const { tokenAddress, publicKey } = req.query;
			if (!tokenAddress || !publicKey) {
				res.json([]);
				return;
			}
			const nftServices = new NFTServices(req.RPC_URL);
			const addresses = Array.isArray(tokenAddress) ? tokenAddress : [tokenAddress];
			const NFTInfo = await nftServices.getNFTInfo(addresses, publicKey);
			res.json(NFTInfo);
		} catch (err) {
			res.json(err);
		}
	},
};
