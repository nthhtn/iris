'use strict';

const config = require('../config/index');
const service = require('../server/service')(config);
const http = require('http');
const server = http.createServer(service);
const serviceRegistry = service.get('serviceRegistry');

const witToken = config.witToken;
const WitClient = require('../server/witClient');
const witClient = new WitClient(witToken);

const slackToken = config.slackToken;
const SlackClient = require('../server/slackClient');
const slackClient = new SlackClient(slackToken, config.slackLogLevel, witClient, serviceRegistry);
slackClient.start(() => server.listen(3000));

server.on('listening', () => {
	console.log(`IRIS is listening on ${server.address().port} in ${service.get('env')}`);
});
