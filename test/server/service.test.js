'use strict';

const config = require('../../config/index');
const should = require('should');
const request = require('supertest');
const service = require('../../server/service')(config);

describe('The Express service', () => {

	describe('PUT /foo', () => {
		it('should return HTTP 404', (done) => {
			request(service)
				.put('/foo')
				.expect(404, done);
		});
	});

	describe('PUT /service/:intent/:port', () => {
		it('should return HTTP 200 with valid result', (done) => {
			request(service)
				.put('/service/test/9999')
				.expect(200)
				.end((err, resp) => {
					if (err) {
						return done(err);
					}
					resp.body.result.should.startWith('test at');
					return done();
				});
		});
	});

});
