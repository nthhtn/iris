'use strict';

const config = require('../../config/index');
const should = require('should');
const SlackClient = require('../../server/slackClient');

describe('slackClient', () => {

	it('should successfully connect to Slack', (done) => {
		const slackClient = new SlackClient(config.slackToken, config.slackLogLevel, null, null, config.log('test'));
		slackClient.start((slackRes) => {
			slackRes.ok.should.be.true;
			return done();
		});
	});

});
