'use strict';

const config = require('../config/index');
const service = require('../server/service')(config);
const http = require('http');
const server = http.createServer(service);
const serviceRegistry = service.get('serviceRegistry');

const witToken = config.witToken;
const witClient = require('../server/witClient')(witToken);

const slackClient = require('../server/slackClient');
const slackToken = config.slackToken;
const slackLogLevel = 'verbose';
const rtm = slackClient.init(slackToken, slackLogLevel, witClient, serviceRegistry);
rtm.start();
slackClient.addAuthenticatedHandler(rtm, () => server.listen(3000));

server.on('listening', () => {
	console.log(`IRIS is listening on ${server.address().port} in ${service.get('env')}`);
});
