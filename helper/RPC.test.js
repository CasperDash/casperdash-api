const axios = require('axios');
const { getRPCURL } = require('./RPC');
jest.mock('axios');

test('Should throw error if can not reach all nodes', async () => {
	try {
		await getRPCURL([{ ip: '' }]);
	} catch (error) {
		expect(error).toBe('Can not reach all default nodes!');
	}
});

test('Should return reached node', async () => {
	const spyOnGet = jest.spyOn(axios, 'get');
	spyOnGet.mockReturnValue('1.1.1.1');
	const value = await getRPCURL([{ ip: '1.1.1.1' }]);

	expect(value).toBe('http://1.1.1.1:7777/rpc');
});

test('Should log info if can not reach node', async () => {
	const spyOnGet = jest.spyOn(axios, 'get');
	spyOnGet.mockImplementation(() => {
		throw 'error';
	});
	try {
		await getRPCURL([{ ip: '1.1.1.1' }]);
	} catch (error) {
		expect(console.info).toHaveBeenCalled();
	}
});
