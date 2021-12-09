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
};

module.exports = { NFT_CONFIG };
