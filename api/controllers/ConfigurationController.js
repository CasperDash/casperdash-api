const { MOTE_RATE, RPC_URL } = require('../../constants');

module.exports = {
	get: async (req, res) => {
		res.json({ MOTE_RATE, RPC_URL, API_VERSION: '1.0.1' });
	},
};
