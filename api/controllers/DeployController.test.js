const deployController = require('./DeployController');

const mockGetLatestBlockHash = jest.fn();
const mockPutDeploy = jest.fn();
const mockGetDeploysStatus = jest.fn();
jest.mock('../services/CasperServices', () => {
	return jest.fn().mockImplementation(() => {
		return {
			putDeploy: mockPutDeploy,
			getDeploysStatus: mockGetDeploysStatus,
			getLatestBlockHash: mockGetLatestBlockHash,
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

describe('deploy', () => {
	test('Should return deploy hash', async () => {
		const mockRequest = {
			body: {},
			RPC_URL: '',
		};
		mockPutDeploy.mockReturnValue('testhash');
		await deployController.deploy(mockRequest, mockResponse);
		expect(mockPutDeploy).toHaveBeenCalled();
		expect(mockJson).toHaveBeenCalledWith({ deployHash: 'testhash' });
	});
	test('Should return error', async () => {
		const mockRequest = {
			body: {},
			RPC_URL: '',
		};
		mockPutDeploy.mockImplementation(() => {
			throw { message: 'error' };
		});
		await deployController.deploy(mockRequest, mockResponse);
		expect(mockStatus).toHaveBeenCalled();
		expect(mockJson).toHaveBeenCalled();
		expect(mockJson).toHaveBeenCalledWith({ message: 'error' });
	});
});

describe('getDeploysStatus', () => {
	test('Should return deploy status', async () => {
		const mockRequest = {
			query: {},
		};
		mockGetDeploysStatus.mockReturnValue([{ hash: 'testhash', status: 'completed' }]);
		await deployController.getDeploysStatus(mockRequest, mockResponse);
		expect(mockGetDeploysStatus).toHaveBeenCalled();
		expect(mockJson).toHaveBeenCalled();
		expect(mockJson).toHaveBeenCalledWith([{ hash: 'testhash', status: 'completed' }]);
	});
	test('Should return error', async () => {
		const mockRequest = {
			query: {},
		};
		mockGetDeploysStatus.mockImplementation(() => {
			throw { message: 'error' };
		});
		await deployController.getDeploysStatus(mockRequest, mockResponse);
		expect(mockStatus).toHaveBeenCalled();
		expect(mockJson).toHaveBeenCalled();
		expect(mockJson).toHaveBeenCalledWith({ message: 'error' });
	});
});

describe('getLatestBlockHash', () => {
	test('Should return latest block hash', async () => {
		const mockRequest = {};
		mockGetLatestBlockHash.mockReturnValue('testhash');
		await deployController.getLatestBlockHash(mockRequest, mockResponse);
		expect(mockGetLatestBlockHash).toHaveBeenCalled();
		expect(mockJson).toHaveBeenCalled();
		expect(mockJson).toHaveBeenCalledWith({ latestBlockHash: 'testhash' });
	});
	test('Should return error', async () => {
		const mockRequest = {};
		mockGetLatestBlockHash.mockImplementation(() => {
			throw { message: 'error' };
		});
		await deployController.getLatestBlockHash(mockRequest, mockResponse);
		expect(mockStatus).toHaveBeenCalled();
		expect(mockJson).toHaveBeenCalled();
		expect(mockJson).toHaveBeenCalledWith({ message: 'error' });
	});
});
