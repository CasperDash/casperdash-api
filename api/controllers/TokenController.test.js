const TokenController = require('./TokenController');

const mockGetTokensBalanceByPublicKey = jest.fn();
const mockGetListTokenInfo = jest.fn();
const mockGetTokenInfo = jest.fn();

jest.mock('../services/TokenServices', () => {
	return jest.fn().mockImplementation(() => {
		return {
			getTokensBalanceByPublicKey: mockGetTokensBalanceByPublicKey,
			getListTokenInfo: mockGetListTokenInfo,
			getTokenInfo: mockGetTokenInfo,
		};
	});
});

const mockJson = jest.fn();
const mockStatus = jest.fn().mockImplementation(() => {
	return {
		json: mockJson,
	};
});
const mockResponse = {
	json: mockJson,
	status: mockStatus,
};

describe('getTokens', () => {
	test('Should return token info', async () => {
		const mockRequest = {
			query: {
				publicKey: 'publickey',
				tokenAddress: 'address',
			},
		};
		mockGetTokensBalanceByPublicKey.mockReturnValue([{ address: 'publickey1', balance: 100, name: 'CasperDash' }]);
		mockGetListTokenInfo.mockReturnValue([{ address: 'publickey1', symbol: 'CDAS', name: 'CasperDash' }]);
		await TokenController.getTokens(mockRequest, mockResponse);
		expect(mockGetTokensBalanceByPublicKey).toHaveBeenCalled();
		expect(mockGetListTokenInfo).toHaveBeenCalled();
		expect(mockJson).toHaveBeenCalledWith([
			{ address: 'publickey1', balance: 100, name: 'CasperDash', symbol: 'CDAS' },
		]);
	});
	test('Should return empty  array if no address', async () => {
		const mockRequest = {
			query: {
				publicKey: 'publickey',
			},
		};
		await TokenController.getTokens(mockRequest, mockResponse);
		expect(mockJson).toHaveBeenCalledWith([]);
	});
	test('Should return error', async () => {
		const mockRequest = {
			query: {
				publicKey: 'publickey',
				tokenAddress: 'address',
			},
		};
		mockGetTokensBalanceByPublicKey.mockImplementation(() => {
			throw { message: 'error' };
		});
		await TokenController.getTokens(mockRequest, mockResponse);
		expect(mockStatus).toHaveBeenCalled();
		expect(mockJson).toHaveBeenCalled();
		expect(mockJson).toHaveBeenCalledWith({ message: 'error' });
	});
});

describe('getToken', () => {
	test('Should return token info', async () => {
		const mockRequest = {
			params: {
				tokenAddress: 'address',
			},
		};

		mockGetTokenInfo.mockReturnValue({ address: 'publaddressickey1', symbol: 'CDAS', name: 'CasperDash' });
		await TokenController.getToken(mockRequest, mockResponse);
		expect(mockGetTokenInfo).toHaveBeenCalled();
		expect(mockJson).toHaveBeenCalledWith({ address: 'publaddressickey1', symbol: 'CDAS', name: 'CasperDash' });
	}),
		test('Should return error', async () => {
			const mockRequest = {
				query: {
					tokenAddress: 'address',
				},
			};
			mockGetTokenInfo.mockImplementation(() => {
				throw { message: 'error' };
			});
			await TokenController.getToken(mockRequest, mockResponse);
			expect(mockStatus).toHaveBeenCalled();
			expect(mockJson).toHaveBeenCalled();
			expect(mockJson).toHaveBeenCalledWith({ message: 'error' });
		});
});
