const NFTController = require('./NFTController');

const mockGetNFTInfo = jest.fn();
const mockGetNFTContractsInfoByPublicKey = jest.fn();
const mockGetSampleNFTContract = jest.fn();
const mockGetNFTContractsInfo = jest.fn();
jest.mock('../services/NFTServices', () => {
	return jest.fn().mockImplementation(() => {
		return {
			getNFTInfo: mockGetNFTInfo,
			getNFTContractsInfoByPublicKey: mockGetNFTContractsInfoByPublicKey,
			getSampleNFTContract: mockGetSampleNFTContract,
			getNFTContractsInfo: mockGetNFTContractsInfo,
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

afterEach(() => {
	mockJson.mockClear();
});

describe('getNFTs', () => {
	test('Should return NFT info', async () => {
		const mockRequest = {
			query: {
				tokenAddress: ['test'],
				publicKey: 'publickey',
			},
		};
		mockGetNFTInfo.mockReturnValue({ nft: {} });
		await NFTController.getNFTs(mockRequest, mockResponse);
		expect(mockGetNFTInfo).toHaveBeenCalled();
		expect(mockJson).toHaveBeenCalledWith({ nft: {} });
	});
	test('Should return error', async () => {
		const mockRequest = {
			query: {
				tokenAddress: ['test'],
				publicKey: 'publickey',
			},
		};
		mockGetNFTInfo.mockImplementation(() => {
			throw { message: 'error' };
		});
		await NFTController.getNFTs(mockRequest, mockResponse);
		expect(mockStatus).toHaveBeenCalled();
		expect(mockJson).toHaveBeenCalled();
		expect(mockJson).toHaveBeenCalledWith({ message: 'error' });
	});
	test('Should return empty array if no public key or token address', async () => {
		const mockRequest = {
			query: {
				tokenAddress: undefined,
			},
		};
		await NFTController.getNFTs(mockRequest, mockResponse);
		expect(mockJson).toHaveBeenCalled();
		expect(mockJson).toHaveBeenCalledWith([]);
	});
});

describe('getNFTContracts', () => {
	test('Should return empty array if no public key', async () => {
		const mockRequest = {
			params: {
				publicKey: '',
			},
		};

		await NFTController.getNFTContracts(mockRequest, mockResponse);

		expect(mockJson).toHaveBeenCalledWith([]);
	});
	test('Should return NFT contract', async () => {
		const mockRequest = {
			params: {
				publicKey: 'publickey',
			},
		};
		mockGetNFTContractsInfoByPublicKey.mockReturnValue(['nftContract']);
		await NFTController.getNFTContracts(mockRequest, mockResponse);
		expect(mockGetNFTContractsInfoByPublicKey).toHaveBeenCalled();
		expect(mockJson).toHaveBeenCalledWith(['nftContract']);
	});
	test('Should return error', async () => {
		const mockRequest = {
			params: {
				publicKey: 'publickey',
			},
		};
		mockGetNFTContractsInfoByPublicKey.mockImplementation(() => {
			throw new Error('error');
		});
		await NFTController.getNFTContracts(mockRequest, mockResponse);
		expect(mockStatus).toHaveBeenCalled();
		expect(mockJson).toHaveBeenCalled();
		expect(mockJson).toHaveBeenCalledWith({ message: 'error' });
	});
});

describe('getContractInfo', () => {
	test('Should return NFT contract info', async () => {
		const mockRequest = {
			params: {
				contractAddress: 'test',
			},
		};
		mockGetSampleNFTContract.mockReturnValue(() => {
			throw new Error('error');
		});
		await NFTController.getNFTContracts(mockRequest, mockResponse);

		expect(mockJson).toHaveBeenCalledWith([]);
	});

	test('Should return error', async () => {
		const mockRequest = {};
		mockGetSampleNFTContract.mockImplementation(() => {
			throw new Error('error');
		});
		await NFTController.getNFTContractDeploy(mockRequest, mockResponse);
		expect(mockStatus).toHaveBeenCalled();
		expect(mockJson).toHaveBeenCalled();
		expect(mockJson).toHaveBeenCalledWith({ message: 'error' });
	});
});

describe('getContractInfo', () => {
	test('Should return nft contract info', async () => {
		const mockRequest = { params: { contractAddress: 'test' } };
		mockGetNFTContractsInfo.mockReturnValue({ address: 'test' });
		await NFTController.getContractInfo(mockRequest, mockResponse);
		expect(mockGetNFTContractsInfo).toHaveBeenCalled();
		expect(mockJson).toHaveBeenCalledWith({ address: 'test' });
	});
	test('Should return error', async () => {
		const mockRequest = { params: { contractAddress: 'test' } };
		mockGetNFTContractsInfo.mockImplementation(() => {
			throw new Error('error');
		});
		await NFTController.getContractInfo(mockRequest, mockResponse);
		expect(mockStatus).toHaveBeenCalled();
		expect(mockJson).toHaveBeenCalled();
		expect(mockJson).toHaveBeenCalledWith({ message: 'error' });
	});
	test('Should return required contract error', async () => {
		const mockRequest = { params: { contractAddress: '' } };

		await NFTController.getContractInfo(mockRequest, mockResponse);
		expect(mockStatus).toHaveBeenCalled();
		expect(mockJson).toHaveBeenCalled();
		expect(mockJson).toHaveBeenCalledWith({ message: 'Contract address is required' });
	});
});
