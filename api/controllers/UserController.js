const { rest } = require('lodash');
const UserServices = require('../services/UserService');

module.exports = {
	get: async (req, res) => {
		try {
			const publicKey = req.params.publicKey;
			const userServices = new UserServices(req.RPC_URL);
			const accountDetails = await userServices.getAccountDetails(publicKey);
			res.json(accountDetails);
		} catch (error) {
			res.status(500).json({ message: error.message });
		}
	},
	fetch: async (req, res) => {
		try {
			const { publicKeys } = req.body;
			if (!publicKeys || !publicKeys.length) {
				res.status(400).json({ message: 'Required public keys' });
				return;
			}
			const userServices = new UserServices(req.RPC_URL);
			const promises = publicKeys.map((publicKey) => userServices.getAccountDetails(publicKey));
			const accounts = await Promise.all(promises);
			res.json(accounts);
		} catch (error) {
			res.status(500).json({ message: error.message });
		}
	},
};
