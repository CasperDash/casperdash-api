const { MOTE_RATE } = require('../../constants');

module.exports = {
	get: async (req, res) => {
		res.json({ MOTE_RATE, API_VERSION: '1.0.1' });
	},
};
