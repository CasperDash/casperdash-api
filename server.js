const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const swaggerUI = require('swagger-ui-express');
const { casperNodeMiddleware } = require('./middleware/nodeMiddleware');
let routes = require('./api/routes'); //importing route
const docs = require('./docs');

const app = express();
const port = process.env.PORT;

const allowCrossDomain = function (req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
	res.header('Access-Control-Allow-Headers', 'Content-Type');
	next();
};
app.use(allowCrossDomain);
app.use(express.json({ limit: '50mb' }));

app.options('*', cors());
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(bodyParser.json());
app.use(/^(\/api-docs+|(?!\/api-docs).*)$/, casperNodeMiddleware);

// Load environment variables from .env file while developing on local.
require('dotenv').config();

routes(app);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(docs));
app.use(function (req, res) {
	res.status(404).send({ url: req.originalUrl + ' not found' });
});

if (port) {
	app.listen(port);
}

console.info('RESTful API server started on: ' + port);
const network = process.env.NODE_ENV === 'mainnet' ? 'mainnet' : 'testnet';
console.info(network);

module.exports = app;
