const { getRPCURL } = require('../helper/RPC');

/**
 * Casper node middleware
 * @param {object} req
 * @param {object} res
 * @param {function} next
 */
const casperNodeMiddleware = async (req, res, next) => {
	try {
		req.RPC_URL = await getRPCURL();
		next();
	} catch (error) {
		res.status(500).json({ message: error });
	}
};

module.exports = {
	casperNodeMiddleware,
};
