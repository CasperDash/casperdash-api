const { CasperServiceByJsonRPC, DeployUtil, CLValueParsers, CasperClient } = require('casper-js-sdk');
const CasperServices = require('./CasperServices');

const casperServices = new CasperServices('test');
jest.mock('casper-js-sdk');
const spyOnDeployFromJson = jest.spyOn(DeployUtil, 'deployFromJson');
const spyOnDeployToJson = jest.spyOn(DeployUtil, 'deployToJson');

test('Should call CasperServiceByJsonRPC,CasperClient', () => {
	expect(CasperServiceByJsonRPC).toHaveBeenCalled();
	expect(CasperClient).toHaveBeenCalled();
});

describe('getStateRootHash', () => {
	const mockInstance = CasperServiceByJsonRPC.mock.instances[0];
	const mockGetLatestBlockInfo = mockInstance.getLatestBlockInfo;
	test('Should call getLatestBlockInfo', () => {
		casperServices.getStateRootHash();
		expect(mockGetLatestBlockInfo).toHaveBeenCalled();
	});
	test('Should return state root hash', async () => {
		mockGetLatestBlockInfo.mockReturnValue({
			block: {
				header: {
					state_root_hash: 'testhash',
				},
			},
		});
		const stateRootHash = await casperServices.getStateRootHash();
		expect(stateRootHash).toBe('testhash');
	});
});

describe('getLatestBlockHash', () => {
	const mockInstance = CasperServiceByJsonRPC.mock.instances[0];
	const mockGetLatestBlockInfo = mockInstance.getLatestBlockInfo;
	test('Should call getLatestBlockInfo', () => {
		casperServices.getLatestBlockHash();
		expect(mockGetLatestBlockInfo).toHaveBeenCalled();
	});
	test('Should return latest block hash', async () => {
		mockGetLatestBlockInfo.mockReturnValue({
			block: {
				hash: 'testhash',
			},
		});
		const latestBlockHash = await casperServices.getLatestBlockHash();
		expect(latestBlockHash).toBe('testhash');
	});
});

describe('getCurrentEraId', () => {
	const mockInstance = CasperServiceByJsonRPC.mock.instances[0];
	const mockGetLatestBlockInfo = mockInstance.getLatestBlockInfo;
	test('Should call getLatestBlockInfo', () => {
		casperServices.getCurrentEraId();
		expect(mockGetLatestBlockInfo).toHaveBeenCalled();
	});
	test('Should return state root hash', async () => {
		mockGetLatestBlockInfo.mockReturnValue({
			block: {
				header: {
					era_id: 100,
				},
			},
		});
		const stateRootHash = await casperServices.getCurrentEraId();
		expect(stateRootHash).toBe(100);
	});
});

describe('putDeploy', () => {
	test('Should log error', async () => {
		casperServices.putDeploy();
		expect(console.error).toHaveBeenCalled();
	});
	test('Should call putDeploy', async () => {
		spyOnDeployFromJson.mockReturnValue({});
		const mockInstance = CasperClient.mock.instances[0];
		const mockPutDeploy = mockInstance.putDeploy;
		mockPutDeploy.mockReturnValue('deployhash');
		const hash = await casperServices.putDeploy();
		expect(spyOnDeployFromJson).toHaveBeenCalled();
		expect(mockPutDeploy).toHaveBeenCalled();
		expect(hash).toBe('deployhash');
	});
});

describe('getDeployResultJson', () => {
	test('Should return deploy result obj', async () => {
		const mockInstance = CasperClient.mock.instances[0];
		const mockGetDeploy = mockInstance.getDeploy;
		mockGetDeploy.mockReturnValue([{}, {}]);
		const deploy = await casperServices.getDeployResultJson('test');
		expect(mockGetDeploy).toHaveBeenCalled();
		expect(deploy).toEqual({});
	});
});

describe('getDeployJson', () => {
	test('Should return deploy obj', async () => {
		const mockInstance = CasperClient.mock.instances[0];
		const mockGetDeploy = mockInstance.getDeploy;
		mockGetDeploy.mockReturnValue([{}]);
		spyOnDeployToJson.mockReturnValue({});
		const deploy = await casperServices.getDeployJson('test');
		expect(mockGetDeploy).toHaveBeenCalled();
		expect(spyOnDeployToJson).toHaveBeenCalled();
		expect(deploy).toEqual({});
	});
});

describe('getDeploysResult', () => {
	test('Should return deploy obj', async () => {
		const spyOn = jest.spyOn(casperServices, 'getDeployResultJson');
		spyOn.mockReturnValue('returnValue');
		const value = await casperServices.getDeploysResult('test');
		expect(spyOn).toHaveBeenCalled();
		expect(value).toEqual(['returnValue']);
	});
});

describe('getDeploysStatus', () => {
	const spyOn = jest.spyOn(casperServices, 'getDeploysResult');
	test('Should return deploy with pending status', async () => {
		spyOn.mockReturnValue([{ execution_results: [], deploy: { hash: 'testhash' } }]);
		const value = await casperServices.getDeploysStatus('testhash');
		expect(spyOn).toHaveBeenCalled();
		expect(value).toEqual([{ hash: 'testhash', status: 'pending' }]);
	});
	test('Should return deploy with fail status', async () => {
		spyOn.mockReturnValue([{ execution_results: [{ result: { Failure: {} } }], deploy: { hash: 'testhash' } }]);
		const value = await casperServices.getDeploysStatus('testhash');
		expect(spyOn).toHaveBeenCalled();
		expect(value).toEqual([{ hash: 'testhash', status: 'fail' }]);
	});

	test('Should return deploy with success status', async () => {
		spyOn.mockReturnValue([{ execution_results: [{ result: {} }], deploy: { hash: 'testhash' } }]);
		const value = await casperServices.getDeploysStatus('testhash');
		expect(spyOn).toHaveBeenCalled();
		expect(value).toEqual([{ hash: 'testhash', status: 'success' }]);
	});
});

describe('getStateKeyValue', () => {
	test('Should return value', async () => {
		const spyOn = jest.spyOn(casperServices, 'getStateValue');
		spyOn.mockReturnValue({ CLValue: { data: 'test' } });
		const value = await casperServices.getStateKeyValue();
		expect(spyOn).toHaveBeenCalled();
		expect(value).toBe('test');
	});
});

describe('createRecipientAddress', () => {
	test('Should log error', () => {
		casperServices.createRecipientAddress('test');
		expect(console.error).toHaveBeenCalled();
	});

	test('Should return CLKey', () => {
		const CLKeyValue = casperServices.createRecipientAddress(
			'0160d88b3f847221f4dc6c5549dcfc26772c02f253a24de226a88b4536bc61d4ad',
		);
		expect(CLKeyValue).toEqual(undefined);
	});
});

describe('getAccountHashBase64', () => {
	test('Should call createRecipientAddress', () => {
		const spyOn = jest.spyOn(casperServices, 'createRecipientAddress');
		spyOn.mockReturnValue({});
		const spyOnToBytes = jest.spyOn(CLValueParsers, 'toBytes');
		spyOnToBytes.mockReturnValue({ unwrap: () => 'test' });
		casperServices.getAccountHashBase64();
		expect(spyOn).toHaveBeenCalled();
		expect(spyOnToBytes).toHaveBeenCalled();
	});
});

describe('getContractNamedKeyUref', () => {
	test('Should return named key', async () => {
		const spyGetStateValue = jest.spyOn(casperServices, 'getStateValue');
		spyGetStateValue.mockReturnValue({ Contract: { namedKeys: [{ name: 'test' }] } });
		const value = await casperServices.getContractNamedKeyUref('hash', 'contracthash', ['test']);
		expect(spyGetStateValue).toHaveBeenCalled();
		expect(value).toEqual([{ name: 'test' }]);
	});
	test('Should return empty', async () => {
		const spyGetStateValue = jest.spyOn(casperServices, 'getStateValue');
		spyGetStateValue.mockReturnValue({ Contract: { namedKeys: [{ name: 'test' }] } });
		const value = await casperServices.getContractNamedKeyUref('hash', 'contracthash', []);
		expect(spyGetStateValue).toHaveBeenCalled();
		expect(value).toEqual([]);
	});
});
