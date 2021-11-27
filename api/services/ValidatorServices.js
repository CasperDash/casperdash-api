const { casperServiceRPC, getCurrentEraId } = require('./CasperServices');

/**
 * Retrive the era validators with bid information by eraId. If eraId not give, then get current eraId.
 * @param {Number} eraId
 * @returns
 */
const getValidators = async (eraId) => {
	try {
		let validatorsWithBidInfo = [];
		if (!eraId) {
			const currentEraId = await getCurrentEraId();
			if (!currentEraId) {
				return validatorsWithBidInfo;
			}
			eraId = currentEraId;
		}

		const { auction_state } = await casperServiceRPC.getValidatorsInfo(); // Reference schema: https://github.com/casper-network/casper-node/blob/release-1.4.1/resources/test/rpc_schema_hashing_V2.json#L4073
		if (!auction_state) {
			return validatorsWithBidInfo;
		}

		const { era_validators: eraValidators, bids } = auction_state;
		const eraValidator = eraValidators.find((eValidator) => eValidator.era_id == eraId);
		if (!eraValidator) {
			return validatorsWithBidInfo;
		}

		const { validator_weights: validatorWeights } = eraValidator;
		if (!validatorWeights) {
			return validatorsWithBidInfo;
		}

		validatorsWithBidInfo = massageValidators(validatorWeights, bids);
		return validatorsWithBidInfo;
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
	validator.bidInfo = bid;
	return validator;
};

module.exports = {
	getValidators,
};
