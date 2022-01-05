const CasperServices = require('../services/CasperServices');

module.exports = {
	deploy: async (req, res) => {
		try {
			const body = req.body;
			const casperServices = new CasperServices(req.RPC_URL);
			const hash = await casperServices.putDeploy(body);
			res.json({ deployHash: hash });
		} catch (error) {
			res.status(500).json({ message: error.message });
		}
	},
	getDeploysStatus: async (req, res) => {
		try {
			const query = req.query;
			const casperServices = new CasperServices(req.RPC_URL);
			const deploys = await casperServices.getDeploysStatus(query.deployHash);
			res.json(deploys);
		} catch (error) {
			res.status(500).json({ message: error.message });
		}
	},
	getLatestBlockHash: async (req, res) => {
		try {
			const casperServices = new CasperServices(req.RPC_URL);
			const latestBlockHash = await casperServices.getLatestBlockHash();
			res.json({
				latestBlockHash,
			});
		} catch (error) {
			res.status(500).json({ message: error.message });
		}
	},
};
