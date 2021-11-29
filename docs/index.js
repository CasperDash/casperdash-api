const basicInfo = require('./basicInfo');
const servers = require('./servers');
const tags = require('./tags');
const components = require('./components');
const configuration = require('./configuration');
const deploy = require('./deploy');
const keyManager = require('./keyManager');
const token = require('./token');
const validators = require('./validators');
const NFT = require('./NFT');

const paths = { paths: { ...configuration, ...deploy, ...keyManager, ...token, ...validators, ...NFT } };

module.exports = {
	...basicInfo,
	...servers,
	...tags,
	...paths,
	...components,
};
