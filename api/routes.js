const uploadMiddleware = require('../middleware/uploadMiddleware');
module.exports = function (app) {
	const configController = require('./controllers/ConfigurationController');
	const userController = require('./controllers/UserController');
	const keyManagerController = require('./controllers/KeyManagerController');
	const deployController = require('./controllers/DeployController');
	const tokenController = require('./controllers/TokenController');
	const stakeController = require('./controllers/StakeController');
	const NFTController = require('./controllers/NFTController');
	const FileController = require('./controllers/FileController');

	// Configuration
	app.route('/configurations').get(configController.get);
	// User
	app.route('/user/:publicKey').get(userController.get);
	app.route('/users').post(userController.fetch);

	// Key Manager
	app.route('/keyManager/:publicKey').get(keyManagerController.get);
	app.route('/getKeysManagerDeploy').get(keyManagerController.getKeyManagerContractDeploy);
	app.route('/deployKeyManagerContract').post(keyManagerController.deployKeyManagerContract);
	// Deploy
	app.route('/deploy').post(deployController.deploy);
	app.route('/deploysStatus').get(deployController.getDeploysStatus);
	app.route('/getLatestBlockHash').get(deployController.getLatestBlockHash);
	// Token
	app.route('/tokens/getTokensInfo').get(tokenController.getTokens);
	app.route('/token/:tokenAddress').get(tokenController.getToken);
	// Validator
	app.route('/validators').get(stakeController.getValidators);
	// NFT
	app.route('/nfts/getNFTsInfo').get(NFTController.getNFTs);
	app.route('/nfts/:publicKey/NFTContracts').get(NFTController.getNFTContracts);
	app.route('/nfts/contract/:contractAddress').get(NFTController.getContractInfo);
	app.route('/nfts/getNFTContractDeploy').get(NFTController.getNFTContractDeploy);
	// File
	app.route('/file/storeFile').post(uploadMiddleware.single('image'), FileController.storeFile);
	app.route('/file/:cid').delete(FileController.deleteFile);
};
