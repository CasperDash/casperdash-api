const basicInfo = require('./basicInfo');
const servers = require('./servers');
const tags = require('./tags');
const components = require('./components');
const configurations = require('./configurations');
const deploy = require('./deploy');
const keyManager = require('./keyManager');
const token = require('./token');
const validators = require('./validators');
const NFT = require('./NFT');
const user = require('./user');

const paths = { paths: { ...configurations, ...deploy, ...keyManager, ...token, ...validators, ...NFT, ...user } };

module.exports = {
	...basicInfo,
	...servers,
	...tags,
	...paths,
	...components,
};
