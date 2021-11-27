const ValidatorServices = require('../services/ValidatorServices');

module.exports = {
	getValidators: async (req, res, next) => {
		try {
			const { eraId } = req.params;
			const validatorServices = new ValidatorServices(req.RPC_URL);
			const validators = await validatorServices.getValidators(eraId);
			res.json(validators);
		} catch (err) {
			next(err);
		}
	},
};
