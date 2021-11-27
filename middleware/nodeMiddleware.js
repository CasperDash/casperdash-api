const { getRPCURL } = require('../helper/RPC');

const casperNodeMiddleware = async (req, res, next) => {
	try {
		req.RPC_URL = await getRPCURL();
		next();
	} catch (error) {
		res.error('Can not reach node!');
	}
};

module.exports = {
	casperNodeMiddleware,
};
