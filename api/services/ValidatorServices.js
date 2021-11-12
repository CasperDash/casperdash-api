const { casperServiceRPC } = require('./CasperServices');

const getValidators = async () => {
	try {
		const { auction_state } = await casperServiceRPC.getValidatorsInfo(); // Reference schema: https://github.com/casper-network/casper-node/blob/release-1.4.1/resources/test/rpc_schema_hashing_V2.json#L4073
		const { era_validators: eraValidators, bids } = auction_state;
		const { validator_weights: validatorWeights } = eraValidators[1];
		const validatorWithBidInfo = massageValidators(validatorWeights, bids);
		return validatorWithBidInfo;
	} catch (error) {
		throw error;
	}
};

const massageValidators = (validatorWeights, bids) => {
	return validatorWeights.map((validator) => addBidInfoToValidator(validator, bids));
};

const addBidInfoToValidator = (validator, bids) => {
	const { public_key: validatorPublicKey } = validator;
	const bid = bids.find(({ public_key: bidPublicKey }) => bidPublicKey === validatorPublicKey);
	validator.bid = bid;
	return validator;
};

module.exports = {
	getValidators,
};
