const { CLPublicKey } = require('casper-js-sdk');
const CasperServices = require('./CasperServices');

class UserServices {
	constructor(RPC_URL) {
		this.casperServices = new CasperServices(RPC_URL);
	}

	/**
	 * Get account balance by uref
	 * @param {string} uref
	 * @param {string} stateRootHash
	 */
	getAccountBalanceByUref = async (uref, stateRootHash) => {
		try {
			const rootHash = stateRootHash || (await this.casperServices.getStateRootHash());
			const balance = await this.casperServices.casperServiceRPC.getAccountBalance(rootHash, uref);
			return balance;
		} catch {
			return 0;
		}
	};

	/**
	 * Get the current state of the account
	 * @param {CLPublicKey} fromAccount main account public key
	 * @param {String} stateRootHash
	 * @returns {Object} account state
	 */
	getAccount = async (publicKey, stateRootHash) => {
		try {
			const rootHash = stateRootHash || (await this.casperServices.getStateRootHash());
			const publicKeyCL = CLPublicKey.fromHex(publicKey);

			const blockState = await this.casperServices.casperServiceRPC.getBlockState(
				rootHash,
				publicKeyCL.toAccountHashStr(),
				[],
			);

			return blockState.Account;
		} catch (error) {
			console.error(error);
			throw error;
		}
	};

	/**
	 * Get account details
	 * @param {string} publicKey
	 */
	getAccountDetails = async (publicKey) => {
		const account = await this.getAccount(publicKey);
		const balance = await this.getAccountBalanceByUref(account && account.mainPurse);
		return { ...account, balance };
	};
}

module.exports = UserServices;
