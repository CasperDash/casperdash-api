const NFTController = require('./NFTController');

const mockGetNFTInfo = jest.fn();
jest.mock('../services/NFTServices', () => {
	return jest.fn().mockImplementation(() => {
		return {
			getNFTInfo: mockGetNFTInfo,
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
				tokenAddress: 'test',
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
				publicKey: 'publickey',
			},
		};
		await NFTController.getNFTs(mockRequest, mockResponse);
		expect(mockJson).toHaveBeenCalled();
		expect(mockJson).toHaveBeenCalledWith([]);
	});
});
