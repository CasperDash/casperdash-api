const configurationController = require('./ConfigurationController');
const mockJson = jest.fn();
const mockRequest = jest.fn();
const mockResponse = {
	json: mockJson,
};
test('Should return configuration', () => {
	configurationController.get(mockRequest, mockResponse);
	expect(mockJson).toHaveBeenCalled();
	expect(mockJson).toHaveBeenCalledWith({ MOTE_RATE: 1000000000, API_VERSION: '1.0.1' });
});
