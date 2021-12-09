const CasperServices = require('./CasperServices');
const TokenServices = require('./TokenServices');

const mockDictionaryValueGetter = jest.fn();
const mockCreateRecipientAddress = jest.fn();
const mockGetStateRootHash = jest.fn();
const mockGetContractNamedKeyUref = jest.fn();
const mockGetStateKeyValue = jest.fn();
const mockGetAccountHashBase64 = jest.fn();
jest.mock('./CasperServices', () => {
	return jest.fn().mockImplementation(() => {
		return {
			dictionaryValueGetter: mockDictionaryValueGetter,
			createRecipientAddress: mockCreateRecipientAddress,
			getStateRootHash: mockGetStateRootHash,
			getContractNamedKeyUref: mockGetContractNamedKeyUref,
			getStateKeyValue: mockGetStateKeyValue,
			getAccountHashBase64: mockGetAccountHashBase64,
		};
	});
});

const tokenServices = new TokenServices();

test('Should call CasperServices', () => {
	expect(CasperServices).toHaveBeenCalled();
});

describe('getTokenInfo', () => {
	test('Should call getStateRootHash,mockGetStateKeyValue and return data', async () => {
		mockGetStateKeyValue.mockReturnValue('');
		const value = await tokenServices.getTokenInfo('testaddress');

		expect(mockGetStateRootHash).toHaveBeenCalled();
		expect(mockGetStateKeyValue).toHaveBeenCalled();
		expect(value).toEqual({
			address: 'testaddress',
			decimals: '',
			name: '',
			symbol: '',
			total_supply: '',
		});
	});

	test('Should return empty object and log error if exception', async () => {
		mockGetStateKeyValue.mockImplementation(() => {
			throw 'error';
		});
		const value = await tokenServices.getTokenInfo('testaddress');

		expect(value).toEqual({});
	});
});

describe('getListTokenInfo', () => {
	test('Should call return list token info', async () => {
		mockGetStateKeyValue.mockReturnValue('');
		const value = await tokenServices.getListTokenInfo(['testaddress']);

		expect(value).toEqual([
			{
				address: '43f01f0a9798e64837e7244eafd7b1e6462ebd2023336feb9505ae59c4af3bf8',
				decimals: '',
				name: '',
				symbol: '',
				total_supply: '',
			},
			{ address: 'testaddress', decimals: '', name: '', symbol: '', total_supply: '' },
		]);
	});
	test('Should call accept array as param', async () => {
		mockGetStateKeyValue.mockReturnValue('');
		const value = await tokenServices.getListTokenInfo(['testaddress']);

		expect(value).toEqual([
			{
				address: '43f01f0a9798e64837e7244eafd7b1e6462ebd2023336feb9505ae59c4af3bf8',
				decimals: '',
				name: '',
				symbol: '',
				total_supply: '',
			},
			{ address: 'testaddress', decimals: '', name: '', symbol: '', total_supply: '' },
		]);
	});

	test('Should return empty array  and log error if exception', async () => {
		mockGetStateRootHash.mockImplementation(() => {
			throw 'error';
		});
		const value = await tokenServices.getListTokenInfo(['testaddress']);

		expect(value).toEqual([]);
	});
});

describe('getTokensBalanceByPublicKey', () => {
	test('Should  return list token info', async () => {
		mockGetStateRootHash.mockReturnValue('');
		mockGetContractNamedKeyUref.mockReturnValue([{}]);
		mockDictionaryValueGetter.mockReturnValue(100);
		const value = await tokenServices.getTokensBalanceByPublicKey(['testaddress']);
		expect(mockGetStateRootHash).toHaveBeenCalled();
		expect(mockGetContractNamedKeyUref).toHaveBeenCalled();
		expect(mockGetAccountHashBase64).toHaveBeenCalled();
		expect(mockDictionaryValueGetter).toHaveBeenCalled();
		expect(value).toEqual([
			{ balance: 100, address: '43f01f0a9798e64837e7244eafd7b1e6462ebd2023336feb9505ae59c4af3bf8' },
			{ balance: 100, address: 'testaddress' },
		]);
	});
	test('Should return balance equal 0 if can not get balance uref', async () => {
		mockGetStateRootHash.mockReturnValue('');
		mockGetContractNamedKeyUref.mockReturnValue([]);
		const value = await tokenServices.getTokensBalanceByPublicKey(['testaddress']);
		expect(mockGetStateRootHash).toHaveBeenCalled();
		expect(mockGetContractNamedKeyUref).toHaveBeenCalled();
		expect(value).toEqual([
			{ balance: 0, address: '43f01f0a9798e64837e7244eafd7b1e6462ebd2023336feb9505ae59c4af3bf8' },
			{ balance: 0, address: 'testaddress' },
		]);
	});

	test('Should return balance equal 0 if has exception during get balance for each token address', async () => {
		mockGetStateRootHash.mockReturnValue('');
		mockGetContractNamedKeyUref.mockReturnValue();
		const value = await tokenServices.getTokensBalanceByPublicKey(['testaddress', 'testaddress1']);
		expect(mockGetStateRootHash).toHaveBeenCalled();
		expect(mockGetContractNamedKeyUref).toHaveBeenCalled();
		expect(value).toEqual([
			{ balance: 0, address: '43f01f0a9798e64837e7244eafd7b1e6462ebd2023336feb9505ae59c4af3bf8' },
			{ balance: 0, address: 'testaddress' },
			{ balance: 0, address: 'testaddress1' },
		]);
	});

	test('Should return list of token with default value  if exception', async () => {
		mockGetStateRootHash.mockImplementation(() => {
			throw 'error';
		});
		const value = await tokenServices.getTokensBalanceByPublicKey('testaddress');

		expect(value).toEqual([
			{ balance: 0, address: '43f01f0a9798e64837e7244eafd7b1e6462ebd2023336feb9505ae59c4af3bf8' },
		]);
	});
});
