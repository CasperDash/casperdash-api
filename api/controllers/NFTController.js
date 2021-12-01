const NFTServices = require('../services/NFTServices');

module.exports = {
	getNFTs: async (req, res) => {
		try {
			const { tokenAddress, publicKey } = req.query;
			if (!Array.isArray(tokenAddress) || !publicKey) {
				res.json([]);
				return;
			}
			const nftServices = new NFTServices(req.RPC_URL);

			const NFTInfo = await nftServices.getNFTInfo(tokenAddress, publicKey);
			res.json(NFTInfo);
		} catch (err) {
			res.status(500).json({ message: err.message });
		}
	},
};
