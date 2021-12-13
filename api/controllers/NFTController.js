const NFTServices = require('../services/NFTServices');

module.exports = {
	getNFTs: async (req, res) => {
		try {
			const { nftContracts, publicKey } = req.query;
			if (!publicKey) {
				res.json([]);
				return;
			}
			const nftServices = new NFTServices(req.RPC_URL);

			const NFTInfo = await nftServices.getNFTInfo(nftContracts, publicKey);
			res.json(NFTInfo);
		} catch (err) {
			res.status(500).json({ message: err.message });
		}
	},
	getNFTContracts: async (req, res) => {
		try {
			const { publicKey } = req.params;
			if (!publicKey) {
				res.json([]);
				return;
			}
			const nftServices = new NFTServices(req.RPC_URL);
			const NFTContracts = await nftServices.getNFTContractsInfo(publicKey);
			res.json(NFTContracts);
		} catch (err) {
			res.status(500).json({ message: err.message });
		}
	},
	getNFTContractDeploy: async (req, res) => {
		try {
			const nftServices = new NFTServices(req.RPC_URL);
			const NFTContracts = await nftServices.getSampleNFTContract();
			res.json(NFTContracts);
		} catch (error) {
			res.status(500).json({ message: error.message });
		}
	},
};
