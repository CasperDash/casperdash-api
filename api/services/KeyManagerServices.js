const CasperServices = require('./CasperServices');

const KEY_MANAGER_CONTRACT_DEPLOY_HASH = 'ec7b24c2059781d465120968957a1c20aa192eacf2e3ff7330a8a94007a3ac6a';

class KeyManagerServices {
	constructor(RPC_URL) {
		this.casperServices = new CasperServices(RPC_URL);
	}

	/**
	 * Get Key Manager Deploy
	 */
	getKeyManagerDeploy = async () => {
		const session = await this.casperServices.getDeployJson(KEY_MANAGER_CONTRACT_DEPLOY_HASH);
		return session;
	};

	/**
	 * Deploy Key Manager Contract
	 * @param {object} signedDeploy
	 */
	deployKeyManagerContract = async (signedDeploy) => {
		const keyManagerDeploy = await this.getKeyManagerDeploy();
		const deployJson = { deploy: { ...signedDeploy.deploy, session: keyManagerDeploy.deploy.session } };
		const hash = await this.casperServices.putDeploy(deployJson);
		return hash;
	};
}

module.exports = KeyManagerServices;
