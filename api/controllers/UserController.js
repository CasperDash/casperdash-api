const UserServices = require('../services/UserService');

module.exports = {
	get: async (req, res) => {
		try {
			const publicKey = req.params.publicKey;
			const userServices = new UserServices(req.RPC_URL);
			const accountDetails = await userServices.getAccountDetails(publicKey);
			res.json(accountDetails);
		} catch {
			res.json({});
		}
	},
};
