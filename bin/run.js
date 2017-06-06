'use strict';

const service = require('../server/service');
const http = require('http');
const server = http.createServer(service);
const serviceRegistry = service.get('serviceRegistry');

const witToken = 'CJW5DXMEUZ2UNMPHI63FI3ZYJ4VVZ5FK';
const witClient = require('../server/witClient')(witToken);

const slackClient = require('../server/slackClient');
const slackToken = 'xoxb-190304540482-NNNU4bJjPSwWLeyS8aV3INjX';
const slackLogLevel = 'verbose';
const rtm = slackClient.init(slackToken, slackLogLevel, witClient, serviceRegistry);
rtm.start();
slackClient.addAuthenticatedHandler(rtm, () => server.listen(3000));

server.on('listening', () => {
	console.log(`IRIS is listening on ${server.address().port} in ${service.get('env')}`);
});
