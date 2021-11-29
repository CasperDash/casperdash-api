const keyManagerController = require('./KeyManagerController');

const mockGetKeyManagerDeploy = jest.fn();
const mockDeployKeyManagerContract = jest.fn();
jest.mock('../services/KeyManagerServices', () => {
	return jest.fn().mockImplementation(() => {
		return {
			getKeyManagerDeploy: mockGetKeyManagerDeploy,
			deployKeyManagerContract: mockDeployKeyManagerContract,
		};
	});
});

const mockGetAccount = jest.fn();

jest.mock('../services/UserService', () => {
	return jest.fn().mockImplementation(() => {
		return {
			getAccount: mockGetAccount,
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
		await keyManagerController.get(mockRequest, mockResponse);
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
		await keyManagerController.get(mockRequest, mockResponse);
		expect(mockStatus).toHaveBeenCalled();
		expect(mockJson).toHaveBeenCalled();
		expect(mockJson).toHaveBeenCalledWith({ message: 'error' });
	});
});

describe('getKeyManagerContractDeploy', () => {
	test('Should return deploy', async () => {
		const mockRequest = {};
		mockGetKeyManagerDeploy.mockReturnValue({ deploy: {} });
		await keyManagerController.getKeyManagerContractDeploy(mockRequest, mockResponse);
		expect(mockGetKeyManagerDeploy).toHaveBeenCalled();
		expect(mockJson).toHaveBeenCalledWith({ deploy: {} });
	});
	test('Should return error', async () => {
		const mockRequest = {};
		mockGetKeyManagerDeploy.mockImplementation(() => {
			throw { message: 'error' };
		});
		await keyManagerController.getKeyManagerContractDeploy(mockRequest, mockResponse);
		expect(mockStatus).toHaveBeenCalled();
		expect(mockJson).toHaveBeenCalled();
		expect(mockJson).toHaveBeenCalledWith({ message: 'error' });
	});
});

describe('deployKeyManagerContract', () => {
	test('Should return deploy hash', async () => {
		const mockRequest = { body: {} };
		mockDeployKeyManagerContract.mockReturnValue('testhash');
		await keyManagerController.deployKeyManagerContract(mockRequest, mockResponse);
		expect(mockDeployKeyManagerContract).toHaveBeenCalled();
		expect(mockJson).toHaveBeenCalledWith({ deployHash: 'testhash' });
	});
	test('Should return error', async () => {
		const mockRequest = {};
		mockDeployKeyManagerContract.mockImplementation(() => {
			throw { message: 'error' };
		});
		await keyManagerController.deployKeyManagerContract(mockRequest, mockResponse);
		expect(mockStatus).toHaveBeenCalled();
		expect(mockJson).toHaveBeenCalled();
		expect(mockJson).toHaveBeenCalledWith({ message: 'error' });
	});
});
