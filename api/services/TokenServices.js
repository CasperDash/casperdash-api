const { ERC20_TOKEN_ATTRS } = require('../../constants');
const { TOKEN_CONFIG } = require('../../config');
const CasperServices = require('./CasperServices');

class TokenServices {
	constructor(RPC_URL) {
		this.casperServices = new CasperServices(RPC_URL);
	}

	/**
	 * Get all token addresses which will be queried data
	 * @param {array} tokenAddress
	 */
	getAllTokenAddress = (tokenAddress) => {
		return [...new Set([...Object.keys(TOKEN_CONFIG), ...(Array.isArray(tokenAddress) ? tokenAddress : [])])];
	};

	/**
	 * Get token info by contract address hash
	 * @param {String} contractAddress contract address hash
	 * @param {String} stateRootHash
	 * @returns {Object} account state
	 */
	getTokenInfo = async (contractAddress, stateRootHash) => {
		try {
			const rootHash = stateRootHash || (await this.casperServices.getStateRootHash());
			const formattedAddressHash = contractAddress.includes('hash') ? contractAddress : `hash-${contractAddress}`;
			const tokenInfo = await Promise.all(
				ERC20_TOKEN_ATTRS.map(async (attr) => {
					try {
						return {
							[attr]: await this.casperServices.getStateKeyValue(rootHash, formattedAddressHash, attr),
						};
					} catch (error) {
						console.error(error);
						return { [attr]: '' };
					}
				}),
			);
			return tokenInfo.reduce((out, tokenAttr) => ({ ...out, ...tokenAttr }), { address: contractAddress });
		} catch (err) {
			console.error(err);
			return {};
		}
	};

	/**
	 * Get token info for list of contract address hash
	 * @param {Array,String} contractAddressList List contract address
	 * @param {String} stateRootHash
	 * @returns {Array} balance
	 */
	getListTokenInfo = async (tokenAddressList, stateRootHash) => {
		try {
			const addresses = this.getAllTokenAddress(tokenAddressList);
			const rootHash = stateRootHash || (await this.casperServices.getStateRootHash());
			return await Promise.all(
				addresses
					.filter((addr) => addr)
					.map(async (address) => {
						return await this.getTokenInfo(address, rootHash);
					}),
			);
		} catch (err) {
			console.error(err);
			return [];
		}
	};

	/**
	 * Get the current state of the account
	 * @param {Array} tokenAddressList List of token contract address
	 * @param {String} publicKey public key
	 * @returns {Object} token balance
	 */
	getTokensBalanceByPublicKey = async (tokenAddressList = [], publicKey) => {
		const addresses = this.getAllTokenAddress(tokenAddressList);

		try {
			const stateRootHash = await this.casperServices.getStateRootHash();

			return await Promise.all(
				addresses
					.filter((addr) => addr)
					.map(async (address) => {
						let balance;
						try {
							const [balanceUref] = await this.casperServices.getContractNamedKeyUref(
								stateRootHash,
								address,
								['balances'],
							);
							const accountDictKey = this.casperServices.getAccountHashBase64(publicKey);
							balance = balanceUref
								? await this.casperServices.dictionaryValueGetter(
										stateRootHash,
										accountDictKey,
										balanceUref.key,
								  )
								: 0;
						} catch (error) {
							balance = 0;
						}
						return {
							address: address,
							balance,
						};
					}),
			);
		} catch (error) {
			return addresses.map((address) => ({
				address,
				balance: 0,
			}));
		}
	};
}

module.exports = TokenServices;
