'use strict';

const config = require('../../config/index');
const should = require('should');
const WitClient = require('../../server/witClient');

describe('witClient', () => {

	describe('ask', () => {
		it('should return a valid wit response', (done) => {
			const witClient = new WitClient(config.witToken);
			witClient.ask('What is the current time in Vienna', (err, resp) => {
				if (err) {
					return done(err);
				}
				resp.intent[0].value.should.equal('time');
				resp.location[0].value.should.equal('Vienna');
				return done();
			});
		});
	});

});
