const UserController = require('./UserController');

const mockGetAccount = jest.fn();

jest.mock('../services/UserService', () => {
	return jest.fn().mockImplementation(() => {
		return {
			getAccountDetails: mockGetAccount,
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

describe('get', () => {
	test('Should return account info', async () => {
		const mockRequest = {
			params: {
				publicKey: 'publickey',
			},
		};
		mockGetAccount.mockReturnValue({ account: {} });
		await UserController.get(mockRequest, mockResponse);
		expect(mockGetAccount).toHaveBeenCalled();
		expect(mockJson).toHaveBeenCalledWith({ account: {} });
	});
	test('Should return error', async () => {
		const mockRequest = {
			params: {
				publicKey: 'publickey',
			},
		};
		mockGetAccount.mockImplementation(() => {
			throw { message: 'error' };
		});
		await UserController.get(mockRequest, mockResponse);
		expect(mockStatus).toHaveBeenCalled();
		expect(mockJson).toHaveBeenCalled();
		expect(mockJson).toHaveBeenCalledWith({ message: 'error' });
	});
});
