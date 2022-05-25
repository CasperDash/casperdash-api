const {
	MOTE_RATE,
	CSPR_TRANSFER_FEE,
	CSPR_AUCTION_DELEGATE_FEE,
	CSPR_AUCTION_UNDELEGATE_FEE,
	TOKEN_TRANSFER_FEE,
	IPFS_GATEWAY,
	MIN_CSPR_DELEGATE_TO_NEW_VALIDATOR,
	MAX_DELEGATOR_PER_VALIDATOR,
	OLD_NFT_SMART_CONTRACT_ADDRESSES,
	PARTNERSHIP_VALIDATORS,
} = require('../../constants');

module.exports = {
	get: async (req, res) => {
		res.json({
			MOTE_RATE,
			API_VERSION: '1.1.2',
			CSPR_TRANSFER_FEE,
			CSPR_AUCTION_DELEGATE_FEE,
			CSPR_AUCTION_UNDELEGATE_FEE,
			TOKEN_TRANSFER_FEE,
			IPFS_GATEWAY,
			MIN_CSPR_DELEGATE_TO_NEW_VALIDATOR,
			MAX_DELEGATOR_PER_VALIDATOR,
			OLD_NFT_SMART_CONTRACT_ADDRESSES,
			PARTNERSHIP_VALIDATORS,
		});
	},
};
