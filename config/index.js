const network = process.env.NODE_ENV === 'mainnet' ? 'mainnet' : 'testnet';
const { RPC_CONFIG } = require(`./${network}/RPCConfig`);
const { NFT_CONFIG } = require(`./${network}/NFTConfig`);
const { TOKEN_CONFIG } = require(`./${network}/TokenConfig`);
const { NFT_SAMPLE_CONTRACT } = require(`./${network}/SampleContract`);

module.exports = {
	RPC_CONFIG,
	NFT_CONFIG,
	TOKEN_CONFIG,
	NFT_SAMPLE_CONTRACT,
};
