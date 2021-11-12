const {
	CasperServiceByJsonRPC,
	CasperClient,
	DeployUtil,
	CLPublicKey,
	CLKey,
	CLAccountHash,
	CLValueParsers,
} = require('casper-js-sdk');
const { TESTNET_RPC_URL } = require('../../constants');

const casperServiceRPC = new CasperServiceByJsonRPC(TESTNET_RPC_URL);
const casperClient = new CasperClient(TESTNET_RPC_URL);

const getStateRootHash = async () => {
	const latestBlockInfo = await casperServiceRPC.getLatestBlockInfo();
	const stateRootHash = await casperServiceRPC.getStateRootHash(latestBlockInfo.block.hash);
	return stateRootHash;
};

const getLatestBlockHash = async () => {
	const latestBlockInfo = await casperServiceRPC.getLatestBlockInfo();
	return latestBlockInfo.block.hash;
};

const putDeploy = async (deployJson) => {
	try {
		const deploy = DeployUtil.deployFromJson(deployJson);
		const hash = await casperClient.putDeploy(deploy.val);
		return hash;
	} catch (error) {
		console.log(error);
	}
};

const getDeployResultJson = async (deployHash) => {
	const deploy = await casperClient.getDeploy(deployHash);

	return deploy[1];
};

const getDeployJson = async (deployHash) => {
	const deploy = await casperClient.getDeploy(deployHash);
	const jsonDeploy = DeployUtil.deployToJson(deploy[0]);

	return jsonDeploy;
};

const getDeploysResult = async (deployHash) => {
	const hashes = Array.isArray(deployHash) ? deployHash : [deployHash];
	const deploys = await Promise.all(
		hashes.map(async (hash) => {
			const deployJson = await getDeployResultJson(hash);
			return deployJson;
		}),
	);

	return deploys;
};

const getDeploysStatus = async (deployHash) => {
	const deploysResult = await getDeploysResult(deployHash);
	return deploysResult.length
		? deploysResult.map((result) => {
				const { execution_results, deploy } = result;
				return {
					hash: deploy.hash,
					status: !execution_results.length
						? 'pending'
						: execution_results.some((rs) => rs.result.Failure)
						? 'fail'
						: 'success',
				};
		  })
		: [];
};

const getStateValue = async (stateRootHash, stateKey, statePath) => {
	return await casperClient.nodeClient.getBlockState(stateRootHash, stateKey, statePath);
};

/**
 * Returns value of a key associated with global storage.
 * @param {String} stateRootHash - Root hash of global state at a recent block.
 * @param {String} stateKey - Key of an item within global state.
 * @param {String} statePath - Path of data associated with a key within a global state.
 * @return {Object} On-chain account information.
 */
const getStateKeyValue = async (stateRootHash, stateKey, statePath) => {
	// Chain query: get global state key value.
	const {
		CLValue: { data: value },
	} = await getStateValue(stateRootHash, stateKey, [statePath]);

	return value;
};

/**
 * Get base64 value of account hash
 * @param {String} publicKey - Public key.
 * @return {String} Base64 value.
 */
const getAccountHashBase64 = (publicKey) => {
	const clPublicKey = CLPublicKey.fromHex(publicKey);
	const key = new CLKey(new CLAccountHash(clPublicKey.toAccountHash()));
	const keyBytes = CLValueParsers.toBytes(key).unwrap();
	return Buffer.from(keyBytes).toString('base64');
};

/**
 * get dictionary value
 * @param {String} stateRootHash - Root hash of global state at a recent block.
 * @param {String} dictionaryItemKey - dictionary item key.
 * @param {String} seedUref - Uref.
 * @return {Object} Dictionary value.
 */
const dictionaryValueGetter = async (stateRootHash, dictionaryItemKey, seedUref) => {
	const storedValue = await casperClient.nodeClient.getDictionaryItemByURef(
		stateRootHash,
		dictionaryItemKey,
		seedUref,
	);
	return storedValue && storedValue.CLValue ? storedValue.CLValue.value() : {};
};

/**
 * Get contract named key uref
 * @param {String} stateRootHash - Root hash of global state at a recent block.
 * @param {String} contractHash - Contract hash.
 * @param {String} name - name key.
 * @return {Object} Dictionary value.
 */
const getContractNamedKeyUref = async (stateRootHash, contractHash, name) => {
	const formattedContractHash = `hash-${contractHash}`;
	const stateValue = await getStateValue(stateRootHash, formattedContractHash, []);
	const { Contract } = stateValue;
	const namedKeyObj =
		Contract &&
		Contract.namedKeys &&
		Contract.namedKeys.length &&
		Contract.namedKeys.find((namedKey) => namedKey.name === name);
	return namedKeyObj ? namedKeyObj.key : undefined;
};

module.exports = {
	getStateRootHash,
	casperServiceRPC,
	putDeploy,
	getDeployJson,
	getDeploysResult,
	getDeploysStatus,
	getLatestBlockHash,
	getStateKeyValue,
	getAccountHashBase64,
	dictionaryValueGetter,
	getContractNamedKeyUref,
};
