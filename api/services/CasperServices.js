const {
	CasperServiceByJsonRPC,
	DeployUtil,
	CLPublicKey,
	CLKey,
	CLAccountHash,
	CLValueParsers,
	CasperClient,
} = require('casper-js-sdk');

class CasperServices {
	constructor(RPC_URL) {
		this.url = RPC_URL;
		this.casperServiceRPC = new CasperServiceByJsonRPC(RPC_URL);
		this.casperClient = new CasperClient(RPC_URL);
	}

	/**
	 * Returns root hash of global state at a recent block.
	 * @return {String} state root hash.
	 */
	getStateRootHash = async () => {
		const latestBlockInfo = await this.casperServiceRPC.getLatestBlockInfo();
		return (
			latestBlockInfo &&
			latestBlockInfo.block &&
			latestBlockInfo.block.header &&
			latestBlockInfo.block.header.state_root_hash
		);
	};

	/**
	 * Returns latest block hash.
	 * @return {String} latest block hash.
	 */
	getLatestBlockHash = async () => {
		const latestBlockInfo = await this.casperServiceRPC.getLatestBlockInfo();
		return latestBlockInfo.block.hash;
	};

	/**
	 * Returns current era id.
	 * @return {String} era id.
	 */
	getCurrentEraId = async () => {
		const { block } = await this.casperServiceRPC.getLatestBlockInfo();
		return block.header ? block.header.era_id : null;
	};

	/**
	 * Send deploy to network.
	 * @param {Object} deployJson - Deploy Json Object.
	 * @return {String} deploy hash.
	 */
	putDeploy = async (deployJson) => {
		try {
			const deploy = DeployUtil.deployFromJson(deployJson);
			const hash = await this.casperClient.putDeploy(deploy.val);
			return hash;
		} catch (error) {
			console.error(error);
		}
	};

	/**
	 * Get deploy result.
	 * @param {String} deployHash - Deploy hash.
	 * @return {Object} deploy result.
	 */
	getDeployResultJson = async (deployHash) => {
		const deploy = await this.casperClient.getDeploy(deployHash);
		return deploy.length && deploy[1];
	};

	/**
	 * Get deploy object by deploy hash.
	 * @param {String} deployHash - Deploy hash.
	 * @return {Object} Deploy object.
	 */
	getDeployJson = async (deployHash) => {
		const deploy = await this.casperClient.getDeploy(deployHash);
		const jsonDeploy = DeployUtil.deployToJson(deploy[0]);

		return jsonDeploy;
	};

	/**
	 * Get deploy object by deploy hash.
	 * @param {String} deployHash - Deploy hash.
	 * @return {Object} Deploy object.
	 */
	getDeploysResult = async (deployHash) => {
		const hashes = Array.isArray(deployHash) ? deployHash : [deployHash];
		const deploys = await Promise.all(
			hashes.map(async (hash) => {
				const deployJson = await this.getDeployResultJson(hash);
				return deployJson;
			}),
		);

		return deploys;
	};

	/**
	 * Get deploy result status.
	 * @param {Array} deployHash - List of deploy hash.
	 * @return {Array} List of deploy hash with status.
	 */
	getDeploysStatus = async (deployHash) => {
		const deploysResults = await this.getDeploysResult(deployHash);
		return deploysResults.length
			? deploysResults.map((result) => {
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

	/**
	 * Get on-chain state value by key.
	 * @param {String} deployHash - Deploy hash.
	 * @param {String} stateKey - State key.
	 * @param {Array} statePath - State path.
	 * @return {Object} State Value.
	 */
	getStateValue = async (stateRootHash, stateKey, statePath) => {
		return await this.casperClient.nodeClient.getBlockState(stateRootHash, stateKey, statePath);
	};

	/**
	 * Returns value of a key associated with global storage.
	 * @param {String} stateRootHash - Root hash of global state at a recent block.
	 * @param {String} stateKey - Key of an item within global state.
	 * @param {String} statePath - Path of data associated with a key within a global state.
	 * @return {Object} On-chain account information.
	 */
	getStateKeyValue = async (stateRootHash, stateKey, statePath) => {
		// Chain query: get global state key value.
		const {
			CLValue: { data: value },
		} = await this.getStateValue(stateRootHash, stateKey, [statePath]);

		return value;
	};

	/**
	 * Parse public key to CL value to query on-chain.
	 * @param {String} publicKey - Root hash of global state at a recent block.
	 * @return {CLKey} CL value.
	 */
	createRecipientAddress = (publicKey) => {
		const pbKey = CLPublicKey.fromHex(publicKey);
		return new CLKey(new CLAccountHash(pbKey.toAccountHash()));
	};

	/**
	 * Get base64 value of account hash
	 * @param {String} publicKey - Public key.
	 * @return {String} Base64 value.
	 */
	getAccountHashBase64 = (publicKey) => {
		const key = this.createRecipientAddress(publicKey);
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
	dictionaryValueGetter = async (stateRootHash, dictionaryItemKey, seedUref) => {
		try {
			const storedValue = await this.casperClient.nodeClient.getDictionaryItemByURef(
				stateRootHash,
				dictionaryItemKey,
				seedUref,
			);
			return storedValue && storedValue.CLValue ? storedValue.CLValue.value() : {};
		} catch (error) {
			console.error(error);
		}
	};

	/**
	 * Get contract named key uref
	 * @param {String} stateRootHash - Root hash of global state at a recent block.
	 * @param {String} contractHash - Contract hash.
	 * @param {Array} namedKeys - list named key.
	 * @return {Object} Dictionary value.
	 */
	getContractNamedKeyUref = async (stateRootHash, contractHash, namedKeys = []) => {
		// contract hash must be formatted with hash- prefix before querying data
		const formattedContractHash = `hash-${contractHash}`;
		const stateValue = await this.getStateValue(stateRootHash, formattedContractHash, []);
		const { Contract } = stateValue;
		return Contract && Contract.namedKeys && Contract.namedKeys.length
			? Contract.namedKeys.filter((namedKey) => namedKeys.includes(namedKey.name))
			: [];
	};
}

module.exports = CasperServices;
