const { CLPublicKey, CLKey, CLAccountHash } = require('casper-js-sdk');
const CasperServices = require('./CasperServices');
const NFTServices = require('./NFTServices');

const mockDictionaryValueGetter = jest.fn();
const mockCreateRecipientAddress = jest.fn();
const mockGetStateRootHash = jest.fn();
const mockGetContractNamedKeyUref = jest.fn();
jest.mock('./CasperServices', () => {
	return jest.fn().mockImplementation(() => {
		return {
			dictionaryValueGetter: mockDictionaryValueGetter,
			createRecipientAddress: mockCreateRecipientAddress,
			getStateRootHash: mockGetStateRootHash,
			getContractNamedKeyUref: mockGetContractNamedKeyUref,
		};
	});
});

const nftServices = new NFTServices();

test('Should call CasperServices', () => {
	expect(CasperServices).toHaveBeenCalled();
});

describe('getBalanceByPublicKey', () => {
	test('Should return 0 and log error', async () => {
		mockDictionaryValueGetter.mockReturnValue({ unwrap: () => ({ value: () => 2 }) });
		const balance = await nftServices.getBalanceByPublicKey('testroothash', 'test', 'uref');
		expect(console.error).toHaveBeenCalled();
		expect(balance).toBe(0);
	});
	test('Should return balance', async () => {
		mockDictionaryValueGetter.mockReturnValue({ unwrap: () => ({ value: () => 2 }) });
		const balance = await nftServices.getBalanceByPublicKey(
			'testroothash',
			'0160d88b3f847221f4dc6c5549dcfc26772c02f253a24de226a88b4536bc61d4ad',
			'uref',
		);
		expect(mockDictionaryValueGetter).toHaveBeenCalled();
		expect(balance).toBe(2);
	});
});

describe('getTokenIdsByPublicKey', () => {
	test('Should return empty array and log error', async () => {
		const ids = await nftServices.getTokenIdsByPublicKey(
			'testroothash',
			'0160d88b3f847221f4dc6c5549dcfc26772c02f253a24de226a88b4536bc61d4ad',
			'uref',
			'ownedTokensByIndexUref',
		);

		expect(console.error).toHaveBeenCalled();
		expect(ids).toEqual([]);
	});
	test('Should call getDeployJson', async () => {
		const pbKey = CLPublicKey.fromHex('0160d88b3f847221f4dc6c5549dcfc26772c02f253a24de226a88b4536bc61d4ad');
		const key = new CLKey(new CLAccountHash(pbKey.toAccountHash()));
		mockCreateRecipientAddress.mockReturnValue(key);
		const spyOnGetBalanceByPublicKey = jest.spyOn(nftServices, 'getBalanceByPublicKey');
		const balance = await nftServices.getTokenIdsByPublicKey(
			'testroothash',
			'0160d88b3f847221f4dc6c5549dcfc26772c02f253a24de226a88b4536bc61d4ad',
			'uref',
			'ownedTokensByIndexUref',
		);
		expect(mockCreateRecipientAddress).toHaveBeenCalled();
		expect(spyOnGetBalanceByPublicKey).toHaveBeenCalled();
		expect(balance).toEqual([2, 2]);
	});
});

describe('getTokenIdsByPublicKey', () => {
	test('Should return empty array and log error', async () => {
		const ids = await nftServices.getTokenIdsByPublicKey('testroothash', 'test', 'uref', 'ownedTokensByIndexUref');

		expect(console.error).toHaveBeenCalled();
		expect(ids).toEqual([]);
	});
	test('Should call getDeployJson', async () => {
		const pbKey = CLPublicKey.fromHex('0160d88b3f847221f4dc6c5549dcfc26772c02f253a24de226a88b4536bc61d4ad');
		const key = new CLKey(new CLAccountHash(pbKey.toAccountHash()));
		mockCreateRecipientAddress.mockReturnValue(key);
		const spyOnGetBalanceByPublicKey = jest.spyOn(nftServices, 'getBalanceByPublicKey');
		const balance = await nftServices.getTokenIdsByPublicKey(
			'testroothash',
			'0160d88b3f847221f4dc6c5549dcfc26772c02f253a24de226a88b4536bc61d4ad',
			'uref',
			'ownedTokensByIndexUref',
		);
		expect(mockCreateRecipientAddress).toHaveBeenCalled();
		expect(spyOnGetBalanceByPublicKey).toHaveBeenCalled();
		expect(balance).toEqual([2, 2]);
	});
});

describe('getAttributeConfig', () => {
	test('Should return attribute configuration', async () => {
		const config = await nftServices.getAttributeConfig([{ name: 'Background', key: 'bg' }], 'bg', 'Green');
		expect(config).toEqual({ key: 'bg', name: 'Background', value: 'Green' });
		const noMatchKey = await nftServices.getAttributeConfig([{ name: 'Background', key: 'bg' }], 'color', 'Green');
		expect(noMatchKey).toEqual({ key: 'color', name: 'color', value: 'Green' });
	});
});

describe('getNFTInfoByTokenId', () => {
	test('Should return nft info', async () => {
		const nftsInfo = await nftServices.getNFTInfoByTokenId('roothash', {}, ['test', 'test2'], ['uref1', 'uref2']);
		expect(mockDictionaryValueGetter).toHaveBeenCalled();
		expect(nftsInfo).toEqual([{ tokenId: 'test' }, { tokenId: 'test2' }]);
	});
	test('Should return empty object', async () => {
		const nftsInfo = await nftServices.getNFTInfoByTokenId('roothash', {}, [], ['uref1', 'uref2']);
		expect(mockDictionaryValueGetter).toHaveBeenCalled();
		expect(nftsInfo).toEqual([]);
	});
});

describe('getNFTInfo', () => {
	test('Should return nfts info array', async () => {
		mockGetContractNamedKeyUref.mockReturnValue([
			{ name: 'balances', key: 'balanceuref' },
			{ name: 'owned_tokens_by_index', key: 'owned_tokens_by_index_uref' },
		]);
		const spyOnGetTokenIdsByPublicKey = jest.spyOn(nftServices, 'getTokenIdsByPublicKey');
		spyOnGetTokenIdsByPublicKey.mockReturnValue(['token1', 'token2']);
		const nftsInfo = await nftServices.getNFTInfo(['contract1', 'contract2'], 'publickey');
		expect(mockGetStateRootHash).toHaveBeenCalled();
		expect(mockGetContractNamedKeyUref).toHaveBeenCalled();
		expect(spyOnGetTokenIdsByPublicKey).toHaveBeenCalled();

		expect(nftsInfo).toEqual([
			{
				contractAddress: 'contract1',
				name: undefined,
				symbol: undefined,
				tokenId: 'token1',
			},
			{
				contractAddress: 'contract1',
				name: undefined,
				symbol: undefined,
				tokenId: 'token2',
			},
			{
				contractAddress: 'contract2',
				name: undefined,
				symbol: undefined,
				tokenId: 'token1',
			},
			{
				contractAddress: 'contract2',
				name: undefined,
				symbol: undefined,
				tokenId: 'token2',
			},
			{
				contractAddress: 'F4a75b1a0c1858bc4883165441107e0d23756E4ebdbD558918aD39231f1C7728',
				metadata: [],
				name: 'CasperDash',
				symbol: 'CDAS',
				tokenId: 'token1',
			},
			{
				contractAddress: 'F4a75b1a0c1858bc4883165441107e0d23756E4ebdbD558918aD39231f1C7728',
				metadata: [],
				name: 'CasperDash',
				symbol: 'CDAS',
				tokenId: 'token2',
			},
		]);
	});

	test('Should return empty array if no balance of token by index uref', async () => {
		mockGetContractNamedKeyUref.mockReturnValue([{ name: 'data', key: 'balanceuref' }]);
		const nftsInfo = await nftServices.getNFTInfo(['token1', 'token2'], 'publickey');
		expect(mockGetStateRootHash).toHaveBeenCalled();
		expect(mockGetContractNamedKeyUref).toHaveBeenCalled();

		expect(nftsInfo).toEqual([]);
	});

	test('Should return empty array and log error if have exception', async () => {
		mockGetContractNamedKeyUref.mockImplementation(() => {
			throw 'error';
		});
		const nftsInfo = await nftServices.getNFTInfo(['token1', 'token2'], 'publickey');
		expect(mockGetStateRootHash).toHaveBeenCalled();
		expect(mockGetContractNamedKeyUref).toHaveBeenCalled();
		expect(console.error).toHaveBeenCalled();
		expect(nftsInfo).toEqual([]);
	});
});
