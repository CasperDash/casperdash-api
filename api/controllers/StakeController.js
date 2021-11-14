const { getValidators } = require('../services/ValidatorServices');

module.exports = {
	getValidators: async (req, res, next) => {
		try {
			const { eraId } = req.params;
			const validators = await getValidators(eraId);
			res.json(validators);
		} catch (err) {
			next(err);
		}
	},
};
