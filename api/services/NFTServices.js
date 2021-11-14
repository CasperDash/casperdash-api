const { CLValueParsers, CLPublicKey, CLValueBuilder } = require('casper-js-sdk');
const blake = require('blakejs');
const { concat } = require('@ethersproject/bytes');
const { NFT_CONFIG } = require('../../config/NFTConfig');
const {
	getContractNamedKeyUref,
	getStateRootHash,
	createRecipientAddress,
	dictionaryValueGetter,
} = require('../services/CasperServices');

const OWNED_TOKENS_BY_INDEX_NAMED_KEY = 'owned_tokens_by_index';
const BALANCES_NAMED_KEY = 'balances';

/**
 * Get nft balance
 * @param {String} stateRootHash - Root hash of global state at a recent block.
 * @param {String} publicKey - public key.
 * @param {String} balanceUref - NFT balance Uref.
 * @return {int} balance.
 */
const getBalanceByPublicKey = async (stateRootHash, publicKey, balanceUref) => {
	const pbKey = CLPublicKey.fromHex(publicKey);
	const accountHash = Buffer.from(pbKey.toAccountHash()).toString('hex');
	const result = await dictionaryValueGetter(stateRootHash, accountHash, balanceUref);
	const value = parseInt(result.unwrap().value(), 0);
	return isNaN(value) ? 0 : value;
};

/**
 * Get nft balance
 * @param {String} stateRootHash - Root hash of global state at a recent block.
 * @param {String} publicKey - public key.
 * @param {String} balanceUref - NFT balance Uref.
 * @param {String} ownedTokensByIndexUref - own token by index uref.
 * @return {Array} token Ids.
 */
const getTokenIdsByPublicKey = async (stateRootHash, publicKey, balanceUref, ownedTokensByIndexUref) => {
	const accountKey = createRecipientAddress(publicKey);
	const accountBytes = CLValueParsers.toBytes(accountKey).unwrap();
	const balanceOri = await getBalanceByPublicKey(stateRootHash, publicKey, balanceUref);
	const balance = parseInt(balanceOri, 0);
	return await Promise.all(
		new Array(balance).fill().map(async (value, i) => {
			const numBytes = CLValueParsers.toBytes(CLValueBuilder.u256(i)).unwrap();
			const concated = concat([accountBytes, numBytes]);
			const blaked = blake.blake2b(concated, undefined, 32);
			const str = Buffer.from(blaked).toString('hex');
			const result = await dictionaryValueGetter(stateRootHash, str, ownedTokensByIndexUref);
			const maybeValue = result.unwrap();
			return maybeValue.value();
		}),
	);
};

/**
 * Get token attribute config
 * @param {Array} attributeConf - Attribute configuration list.
 * @param {String} key - token attribute key.
 * @param {String} value - token attribute value.
 * @return {Object} attribute config with value.
 */
const getAttributeConfig = (attributeConf = [], key, value) => {
	const conf = attributeConf.find((conf) => conf.key === key);
	return conf ? { ...conf, value } : { key: key, name: key, value };
};

/**
 * Get information for each tokens
 * @param {String} stateRootHash - Root hash of global state at a recent block.
 * @param {Object} infoNamedKeysConf - Named keys configuration.
 * @param {Array} tokenIds - List of token id.
 * @param {Array} namedKeysUref - List of named key uref.
 * @return {Array} list token with metadata information.
 */
const getNFTInfoByTokenId = async (stateRootHash, infoNamedKeysConf, tokenIds, namedKeysUref) => {
	const allTokenInfos = tokenIds.length
		? await Promise.all(
				tokenIds.map(async (tokenId) => {
					const tokenInfos = await Promise.all(
						Object.keys(infoNamedKeysConf).map(async (namedKey) => {
							const { key: uref } = namedKeysUref.find((uref) => uref.name === namedKey) || {};
							const namedKeyValue = await dictionaryValueGetter(stateRootHash, tokenId, uref);
							const values = namedKeyValue.unwrap().value();
							return {
								[namedKey]: values.map((value) =>
									getAttributeConfig(
										infoNamedKeysConf[namedKey].attributes,
										value[0].data,
										value[1].data,
									),
								),
							};
						}),
					);
					return { tokenId: tokenId, ...tokenInfos.reduce((out, info) => ({ ...out, ...info }), {}) };
				}),
		  )
		: [];
	return allTokenInfos.reduce((out, info) => ({ ...out, ...info }), {});
};

/**
 * Get information for each tokens
 * @param {Array} tokenAddressList - List of NFT contract address.
 * @param {String} publicKey - Public key.
 * @return {Array} NTFs information by public key.
 */
const getNFTInfo = async (tokenAddressList = [], publicKey) => {
	const stateRootHash = await getStateRootHash();
	const NFTInfo = await Promise.all(
		tokenAddressList.map(async (tokenAddress) => {
			const { name, symbol, namedKeys } = NFT_CONFIG[tokenAddress] || {};
			if (!namedKeys) {
				return null;
			}
			const tokenNamedKeys = [OWNED_TOKENS_BY_INDEX_NAMED_KEY, BALANCES_NAMED_KEY, ...Object.keys(namedKeys)];
			try {
				const namedKeysUref = await getContractNamedKeyUref(stateRootHash, tokenAddress, tokenNamedKeys);
				const { key: balanceUref } = namedKeysUref.find((uref) => uref.name === BALANCES_NAMED_KEY) || {};
				const { key: ownedTokensByIndexUref } =
					namedKeysUref.find((uref) => uref.name === OWNED_TOKENS_BY_INDEX_NAMED_KEY) || {};
				if (!balanceUref || !ownedTokensByIndexUref) {
					return null;
				}
				const tokenIds = await getTokenIdsByPublicKey(
					stateRootHash,
					publicKey,
					balanceUref,
					ownedTokensByIndexUref,
				);

				return {
					contractAddress: tokenAddress,
					name,
					symbol,
					...(await getNFTInfoByTokenId(stateRootHash, namedKeys, tokenIds, namedKeysUref)),
				};
			} catch (error) {
				return null;
			}
		}),
	);
	return NFTInfo.filter(Boolean);
};

module.exports = {
	getNFTInfo,
};
