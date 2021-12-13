const { pinFile } = require('../services/FileStorageServices');

module.exports = {
	storeFile: async (req, res) => {
		try {
			res.json({ cid: await pinFile(req.file) });
		} catch (err) {
			res.status(500).json({ message: err.message });
		}
	},
};
