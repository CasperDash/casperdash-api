const { NFTStorage, Blob } = require('nft.storage');

const storage = new NFTStorage({ token: process.env.NFT_STORAGE_API_TOKEN });
const pinFile = async (file) => {
	const cid = await storage.storeBlob(new Blob([file.buffer]));
	return cid;
};
const deletePinedFile = async (cid) => {
	await storage.delete(cid);
};

module.exports = { storage, deletePinedFile, pinFile };
