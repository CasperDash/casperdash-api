const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { casperNodeMiddleware } = require('./middleware/nodeMiddleware');

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

let routes = require('./api/routes'); //importing route
routes(app);

app.use(function (req, res) {
	res.status(404).send({ url: req.originalUrl + ' not found' });
});

if (port) {
	app.listen(port);
}

console.info('RESTful API server started on: ' + port);

module.exports = app;
