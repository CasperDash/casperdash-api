const KeyManagerServices = require('../services/KeyManagerServices');
const UserServices = require('../services/UserService');

module.exports = {
	get: async (req, res) => {
		const { publicKey } = req.params;
		try {
			const userService = new UserServices(req.RPC_URL);
			const keyManagerInfo = await userService.getAccount(publicKey);
			res.json(keyManagerInfo);
		} catch (error) {
			res.status(401).json({ message: error.message });
		}
	},
	getKeyManagerContractDeploy: async (req, res) => {
		try {
			const keyManagerServices = new KeyManagerServices(req.RPC_URL);
			res.json(await keyManagerServices.getKeyManagerDeploy());
		} catch (error) {
			res.status(500).json({ message: error.message });
		}
	},
	deployKeyManagerContract: async (req, res) => {
		try {
			const body = req.body;
			const keyManagerServices = new KeyManagerServices(req.RPC_URL);
			const hash = await keyManagerServices.deployKeyManagerContract(body);
			res.json({ deployHash: hash });
		} catch (error) {
			res.status(500).json({ message: error.message });
		}
	},
};
