const { CasperPunkImageMassage } = require('../helpers/NFT');

const NFT_CONFIG = {
	'6cdf5a5e23eedb6b79cfe52d16fa07cbdece9516b13dde03e6c28b288d5c3a7c': {
		name: 'CaskCollectibleToken',
		symbol: 'CTT',
		namedKeys: {
			metadata: {
				attributes: [
					{ key: 'bg', name: 'Background' },
					{ key: 'description', name: 'Description' },
					{ key: 'distillery', name: 'Distillery' },
					{ key: 'image', name: 'Image' },
					{ key: 'logo', name: 'Logo' },
					{ key: 'name', name: 'Name' },
					{ key: 'rim', name: 'Rim' },
					{ key: 'year', name: 'Year' },
					{ key: 'wood', name: 'Wood' },
				],
			},
			commissions: {
				attributes: [
					{ key: 'mcask_account', name: 'Metacask Account' },
					{ key: 'mcask_rate', name: 'Commission Rate' },
				],
			},
		},
	},
	b779e1b099e52a86d6d4ac69eb09f0a458e7fda27b1b8fe806d12b00a5723174: {
		name: 'Casperdash-nft',
		symbol: 'CDAS',
		namedKeys: { metadata: {} },
	},
	'55cc25981545886d019401a40768adf71084ff4c251734b54280c3f1d600c9d1': {
		name: 'CasperPunks',
		symbol: 'CSPR-PNK',
		namedKeys: {
			metadata: {
				attributes: [{ key: 'asset', name: 'image', massageFnc: CasperPunkImageMassage, strictKey: 'image' }],
			},
		},
	},
};

module.exports = { NFT_CONFIG };
