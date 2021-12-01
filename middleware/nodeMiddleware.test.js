const { getRPCURL } = require('../helper/RPC');
const { casperNodeMiddleware } = require('./nodeMiddleware');

jest.mock('../helper/RPC');

test('Should return rpc url and go next', async () => {
	getRPCURL.mockReturnValue('test');
	const mockNext = jest.fn();
	await casperNodeMiddleware({}, {}, mockNext);
	expect(getRPCURL).toHaveBeenCalled();
	expect(mockNext).toHaveBeenCalled();
});

test('Should return error', async () => {
	getRPCURL.mockImplementation(() => {
		throw 'test';
	});
	const mockNext = jest.fn();
	try {
		await casperNodeMiddleware(jest.fn(), {}, mockNext);
	} catch {
		expect(mockNext).toHaveBeenCalledTimes(0);
	}
});
