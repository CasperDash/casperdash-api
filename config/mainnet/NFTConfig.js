const { CasperPunkImageMassage } = require('../helpers/NFT');

const NFT_CONFIG = {
	// Contract hash is key
	'6cdf5a5e23eedb6b79cfe52d16fa07cbdece9516b13dde03e6c28b288d5c3a7c': {
		name: 'CaskCollectibleToken', // token name
		symbol: 'CTT', // token symbol
		namedKeys: {
			// all named keys that you want to get should be list
			metadata: {
				// metadata named key
				attributes: [
					// list attributes which you want to massage before return to client
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
	b779E1b099e52A86D6D4Ac69eB09F0a458E7Fda27B1B8Fe806D12b00a5723174: {
		name: 'Casperdash-nft',
		symbol: 'CDAS',
		namedKeys: { metadata: {} },
	},
	'55cc25981545886D019401a40768Adf71084Ff4c251734b54280C3F1d600c9D1': {
		name: 'CasperPunks',
		symbol: 'CSPR-PNK',
		namedKeys: {
			metadata: {
				attributes: [{ key: 'asset', name: 'image', massageFnc: CasperPunkImageMassage, strictKey: 'image' }],
			},
		},
	},
	'46bd6b13b50de832adaed91609d90198c40b3673ffe688a3ccf7c14266461eb5': {
		name: 'selfie',
		symbol: 'SELFIE',
		namedKeys: {
			metadata: {
				attributes: [{ key: 'url', name: 'image', strictKey: 'image' }],
			},
		},
	},
};

module.exports = { NFT_CONFIG };
