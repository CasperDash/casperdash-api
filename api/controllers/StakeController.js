const { getValidators } = require('../services/ValidatorServices');

module.exports = {
	getValidators: async (req, res, next) => {
		try {
			const validators = await getValidators();
			res.json(validators);
		} catch (err) {
			next(err);
		}
	},
};
