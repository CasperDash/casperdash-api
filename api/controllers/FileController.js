const { pinFile, deletePinedFile } = require('../services/FileStorageServices');

module.exports = {
	storeFile: async (req, res) => {
		try {
			res.json({ cid: await pinFile(req.file) });
		} catch (error) {
			res.status(500).json({ message: error.message });
		}
	},
	deleteFile: (req, res) => {
		try {
			const { cid } = req.params;
			deletePinedFile(cid);
			res.json({ cid });
		} catch (error) {
			res.status(500).json({ message: error.message });
		}
	},
};
