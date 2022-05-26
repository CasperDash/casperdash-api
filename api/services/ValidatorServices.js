const { PARTNERSHIP_VALIDATORS } = require('../../constants');
const CasperServices = require('./CasperServices');

class ValidatorServices {
	constructor(RPC_URL) {
		this.casperServices = new CasperServices(RPC_URL);
	}

	/**
	 * Retrive the era validators with bid information by eraId. If eraId not give, then get current eraId.
	 * @param {Number} eraId
	 * @returns
	 */
	getValidators = async (eraId) => {
		let validatorsWithBidInfo = [];
		if (!eraId) {
			const currentEraId = await this.casperServices.getCurrentEraId();
			if (!currentEraId) {
				return validatorsWithBidInfo;
			}
			eraId = currentEraId;
		}

		const { auction_state } = await this.casperServices.casperServiceRPC.getValidatorsInfo(); // Reference schema: https://github.com/casper-network/casper-node/blob/release-1.4.1/resources/test/rpc_schema_hashing_V2.json#L4073
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

		validatorsWithBidInfo = this.massageValidators(validatorWeights, bids);
		return this.sortValidators(validatorsWithBidInfo);
	};

	/**
	 * Massage validators info
	 * @param {number} validatorWeights
	 * @param {array} bids
	 */
	massageValidators = (validatorWeights, bids) => {
		return validatorWeights.map((validator) => this.addBidInfoToValidator(validator, bids));
	};

	/**
	 * Add bid info to validator
	 * @param {object} validator
	 * @param {array} bids
	 */
	addBidInfoToValidator = (validator, bids) => {
		const { public_key: validatorPublicKey } = validator;
		const bid = bids.find(({ public_key: bidPublicKey }) => bidPublicKey === validatorPublicKey);
		validator.bidInfo = bid;
		return validator;
	};
	/**
	 * Sort validators based on PARTNERSHIP_VALIDATORS by
	 * 1. Sorting the PARTNERSHIP_VALIDATORS
	 * 2. Remove and insert the found validator in the first position of array.
	 * @param {array} validators
	 * @returns {array}
	 */
	sortValidators = (validators) => {
		if (!PARTNERSHIP_VALIDATORS || !PARTNERSHIP_VALIDATORS.length) {
			return validators;
		}

		PARTNERSHIP_VALIDATORS.sort((a, b) => a.priority - b.priority).forEach(
			({ priority, public_key, name, logo }) => {
				const foundIdx = validators.findIndex((validator) => validator.public_key === public_key);
				if (foundIdx < 0) {
					return;
				}
				const foundValidator = { ...validators[foundIdx], priority, public_key, name, logo };
				validators.splice(foundIdx, 1);
				validators.unshift(foundValidator);
			},
		);

		return validators;
	};
}

module.exports = ValidatorServices;
