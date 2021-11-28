const CasperServices = require('./CasperServices');
const KeyManagerServices = require('./KeyManagerServices');
const mockGetDeployJson = jest.fn();
const mockPutDeploy = jest.fn();
jest.mock('./CasperServices', () => {
	return jest.fn().mockImplementation(() => {
		return {
			getDeployJson: mockGetDeployJson,
			putDeploy: mockPutDeploy,
		};
	});
});

const keyManagerServices = new KeyManagerServices();
test('Should call CasperServices', () => {
	expect(CasperServices).toHaveBeenCalled();
});

describe('getKeyManagerDeploy', () => {
	test('Should call getDeployJson', async () => {
		await keyManagerServices.getKeyManagerDeploy();
		expect(mockGetDeployJson).toHaveBeenCalled();
	});
});

describe('deployKeyManagerContract', () => {
	test('Should return deployed key manager hash', async () => {
		const spyOn = jest.spyOn(keyManagerServices, 'getKeyManagerDeploy');
		mockPutDeploy.mockReturnValue('testhash');
		spyOn.mockReturnValue({ deploy: {} });
		const hash = await keyManagerServices.deployKeyManagerContract({ deploy: {} });
		expect(spyOn).toHaveBeenCalled();
		expect(mockPutDeploy).toHaveBeenCalled();
		expect(hash).toBe('testhash');
	});
});
