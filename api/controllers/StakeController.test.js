const StakeController = require('./StakeController');

const mockGetValidators = jest.fn();
jest.mock('../services/ValidatorServices', () => {
	return jest.fn().mockImplementation(() => {
		return {
			getValidators: mockGetValidators,
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

describe('getValidators', () => {
	test('Should return validators info', async () => {
		const mockRequest = { params: {} };
		mockGetValidators.mockReturnValue([{ validator: {} }]);
		await StakeController.getValidators(mockRequest, mockResponse);
		expect(mockGetValidators).toHaveBeenCalled();
		expect(mockJson).toHaveBeenCalledWith([{ validator: {} }]);
	});
	test('Should return error', async () => {
		const mockRequest = { params: {} };
		mockGetValidators.mockImplementation(() => {
			throw { message: 'error' };
		});
		await StakeController.getValidators(mockRequest, mockResponse);
		expect(mockStatus).toHaveBeenCalled();
		expect(mockJson).toHaveBeenCalled();
		expect(mockJson).toHaveBeenCalledWith({ message: 'error' });
	});
});
