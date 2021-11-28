const CasperServices = require('./CasperServices');
const UserServices = require('./UserService');

const mockGetStateRootHash = jest.fn();
const mockGetAccountBalance = jest.fn();
const mockGetBlockState = jest.fn();
jest.mock('./CasperServices', () => {
	return jest.fn().mockImplementation(() => {
		return {
			casperServiceRPC: {
				getAccountBalance: mockGetAccountBalance,
				getBlockState: mockGetBlockState,
			},
			getStateRootHash: mockGetStateRootHash,
		};
	});
});

const userServices = new UserServices();
test('Should call CasperServices', () => {
	expect(CasperServices).toHaveBeenCalled();
});

describe('getAccountBalanceByUref', () => {
	test('Should call getStateRootHash', async () => {
		await userServices.getAccountBalanceByUref('testuref');
		expect(mockGetStateRootHash).toHaveBeenCalled();
		expect(mockGetAccountBalance).toHaveBeenCalled();
	});
	test('Should call getStateRootHash', async () => {
		mockGetAccountBalance.mockImplementation(() => {
			throw 'error';
		});
		const value = await userServices.getAccountBalanceByUref('testuref');
		expect(value).toBe(0);
	});
});

describe('getAccount', () => {
	test('Should call console.error', async () => {
		try {
			await userServices.getAccount('testkey');
		} catch (error) {
			expect(console.error).toHaveBeenCalled();
		}
	});

	test('Should call getStateRootHash', async () => {
		mockGetBlockState.mockReturnValue({ Account: { hash: 'test' } });
		const value = await userServices.getAccount(
			'01de521de53e64d41a8ff8fd32a8b3924ad0882227ffb3b3532d855863dd13b08f',
		);
		expect(mockGetStateRootHash).toHaveBeenCalled();
		expect(mockGetBlockState).toHaveBeenCalled();
		expect(value).toEqual({ hash: 'test' });
	});
});
