const { getRPCURL } = require('../helper/RPC');

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
