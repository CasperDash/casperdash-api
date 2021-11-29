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

app.options('*', cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(casperNodeMiddleware);

routes(app);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(docs));
app.use(function (req, res) {
	res.status(404).send({ url: req.originalUrl + ' not found' });
});

if (port) {
	app.listen(port);
}

console.info('RESTful API server started on: ' + port);

module.exports = app;
