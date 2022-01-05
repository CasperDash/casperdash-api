const { CID } = require('multiformats/cid');

module.exports = {
	CasperPunkImageMassage: (value = '') => {
		//remove ipfs prefix
		const cid = typeof value === 'string' ? value.replace('ipfs://', '') : '';
		if (cid) {
			return `https://${CID.parse(cid).toV1().toString()}.ipfs.dweb.link/`;
		}
		return value;
	},
};
