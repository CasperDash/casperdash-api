const configurationController = require('./ConfigurationController');
const mockJson = jest.fn();
const mockRequest = jest.fn();
const mockResponse = {
	json: mockJson,
};
test('Should return configuration', () => {
	configurationController.get(mockRequest, mockResponse);
	expect(mockJson).toHaveBeenCalled();
	expect(mockJson).toHaveBeenCalledWith({
		API_VERSION: '1.1.2',
		CSPR_AUCTION_DELEGATE_FEE: 2.5,
		CSPR_AUCTION_UNDELEGATE_FEE: 0.00001,
		CSPR_TRANSFER_FEE: 0.1,
		IPFS_GATEWAY: 'ipfs.dweb.link',
		MAX_DELEGATOR_PER_VALIDATOR: 952,
		MIN_CSPR_DELEGATE_TO_NEW_VALIDATOR: 500,
		MOTE_RATE: 1000000000,
		TOKEN_TRANSFER_FEE: 1,
		OLD_NFT_SMART_CONTRACT_ADDRESSES: [
			'b779e1b099e52a86d6d4ac69eb09f0a458e7fda27b1b8fe806d12b00a5723174',
			'e6376c6f97c9464a79bfc100247bea4ee054b264d19bc9294fc85b151ec3fb8c',
			'b779E1b099e52A86D6D4Ac69eB09F0a458E7Fda27B1B8Fe806D12b00a5723174',
		],
		PARTNERSHIP_VALIDATORS: [
			{
				public_key: '01028e248170a7f328bf7a04696d8f271a1debb54763e05e537eefc1cf24531bc7',
				name: 'OriginStake - Only 1% fee until May 15 🔥🔥',
				logo: 'https://originstake.com/.well-known/casper/originstake_logo_vali_256.png',
				priority: 10,
			},
			{
				public_key: '01bfe29c4645582cab79fea369dcffab349676c8970ad80a99a8518c7453ea393e',
				name: 'OriginStake - Only 1% fee until May 15 🔥🔥',
				logo: 'https://originstake.com/.well-known/casper/originstake_logo_vali_256.png',
				priority: 10,
			},
		],
	});
});
