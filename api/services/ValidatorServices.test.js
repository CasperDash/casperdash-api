const CasperServices = require('./CasperServices');
const ValidatorServices = require('./ValidatorServices');

const mockGetValidatorsInfo = jest.fn();
const mockGetCurrentEraId = jest.fn();
jest.mock('./CasperServices', () => {
	return jest.fn().mockImplementation(() => {
		return {
			casperServiceRPC: {
				getValidatorsInfo: mockGetValidatorsInfo,
			},
			getCurrentEraId: mockGetCurrentEraId,
		};
	});
});

const validatorServices = new ValidatorServices();
test('Should call CasperServices', () => {
	expect(CasperServices).toHaveBeenCalled();
});

describe('addBidInfoToValidator', () => {
	test('Should return validator with bids', async () => {
		const validator = await validatorServices.addBidInfoToValidator({ public_key: 'test' }, [
			{ public_key: 'test', bid: { stacked_amount: 100 } },
		]);

		expect(validator).toEqual({
			bidInfo: { bid: { stacked_amount: 100 }, public_key: 'test' },
			public_key: 'test',
		});
	});
});

describe('massageValidators', () => {
	test('Should return validators with bids', async () => {
		const validator = await validatorServices.massageValidators(
			[{ public_key: 'test' }, { public_key: 'test1' }],
			[{ public_key: 'test', bid: { stacked_amount: 100 } }],
		);

		expect(validator).toEqual([
			{ bidInfo: { bid: { stacked_amount: 100 }, public_key: 'test' }, public_key: 'test' },
			{ bidInfo: undefined, public_key: 'test1' },
		]);
	});
});

describe('getValidators', () => {
	test('Should return empty array if can not get era ID', async () => {
		const validators = await validatorServices.getValidators();
		expect(mockGetCurrentEraId).toHaveBeenCalled();
		expect(validators).toEqual([]);
	});

	test('Should return empty array if can not get auction state', async () => {
		mockGetCurrentEraId.mockReturnValue(100);
		mockGetValidatorsInfo.mockReturnValue({});
		const validators = await validatorServices.getValidators();
		expect(mockGetCurrentEraId).toHaveBeenCalled();
		expect(mockGetValidatorsInfo).toHaveBeenCalled();
		expect(validators).toEqual([]);
	});

	test('Should return empty array if no era validator', async () => {
		mockGetCurrentEraId.mockReturnValue(100);
		mockGetValidatorsInfo.mockReturnValue({ auction_state: { era_validators: [] } });
		const validators = await validatorServices.getValidators();
		expect(mockGetCurrentEraId).toHaveBeenCalled();
		expect(mockGetValidatorsInfo).toHaveBeenCalled();
		expect(validators).toEqual([]);
	});
	test('Should return empty array if no era validator weights', async () => {
		mockGetCurrentEraId.mockReturnValue(100);
		mockGetValidatorsInfo.mockReturnValue({ auction_state: { era_validators: [{ era_id: 100 }] } });
		const validators = await validatorServices.getValidators();
		expect(mockGetCurrentEraId).toHaveBeenCalled();
		expect(mockGetValidatorsInfo).toHaveBeenCalled();
		expect(validators).toEqual([]);
	});
	test('Should return validator info', async () => {
		mockGetCurrentEraId.mockReturnValue(100);
		mockGetValidatorsInfo.mockReturnValue({
			auction_state: { era_validators: [{ era_id: 100, validator_weights: {} }] },
		});
		const spyOnMassageValidators = jest.spyOn(validatorServices, 'massageValidators');
		spyOnMassageValidators.mockReturnValue([{}]);
		const validators = await validatorServices.getValidators();
		expect(mockGetCurrentEraId).toHaveBeenCalled();
		expect(mockGetValidatorsInfo).toHaveBeenCalled();
		expect(spyOnMassageValidators).toHaveBeenCalled();
		expect(validators).toEqual([{}]);
	});
});
