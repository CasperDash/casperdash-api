const { CLPublicKey } = require('casper-js-sdk');
const {
	getStateKeyValue,
	getStateRootHash,
	getAccountHashBase64,
	dictionaryValueGetter,
	getContractNamedKeyUref,
} = require('./CasperServices');
const { ERC20_TOKEN_ATTRS } = require('../../constants');

/**
 * Get token info by contract address hash
 * @param {String} contractAddress contract address hash
 * @param {String} stateRootHash
 * @returns {Object} account state
 */
const getTokenInfo = async (contractAddress, stateRootHash) => {
	try {
		const rootHash = stateRootHash || (await getStateRootHash());
		const formattedAddressHash = `hash-${contractAddress}`;
		const tokenInfo = await Promise.all(
			ERC20_TOKEN_ATTRS.map(async (attr) => {
				return { [attr]: await getStateKeyValue(rootHash, formattedAddressHash, attr) };
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
const getListTokenInfo = async (tokenAddressList, stateRootHash) => {
	try {
		const addresses = Array.isArray(tokenAddressList) ? tokenAddressList : [tokenAddressList];
		const rootHash = stateRootHash || (await getStateRootHash());
		return await Promise.all(
			addresses
				.filter((addr) => addr)
				.map(async (address) => {
					return await getTokenInfo(address, rootHash);
				}),
		);
	} catch (err) {
		console.error(err);
	}
};

/**
 * Get the current state of the account
 * @param {Array} tokenAddressList List of token contract address
 * @param {String} publicKey public key
 * @returns {Object} token balance
 */
const getTokensBalanceByPublicKey = async (tokenAddressList, publicKey) => {
	const addresses = Array.isArray(tokenAddressList) ? tokenAddressList : [tokenAddressList];
	try {
		const stateRootHash = await getStateRootHash();

		return await Promise.all(
			addresses
				.filter((addr) => addr)
				.map(async (address) => {
					let balance;
					try {
						const [balanceUref] = await getContractNamedKeyUref(stateRootHash, address, ['balances']);
						const accountDictKey = getAccountHashBase64(publicKey);
						balance = balanceUref
							? await dictionaryValueGetter(stateRootHash, accountDictKey, balanceUref.key)
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

module.exports = {
	getTokenInfo,
	getListTokenInfo,
	getTokensBalanceByPublicKey,
};
