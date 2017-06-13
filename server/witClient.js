'use strict';

const request = require('superagent');

function handleWitResponse(resp) {
	return resp.entities;
};

class WitClient {

	constructor(token) {
		this._token = token;
	};

	ask(message, callback) {
		request.get('https://api.wit.ai/message')
			.set('Authorization', 'Bearer ' + this._token)
			.query({ v: '31/05/2017', q: message })
			.end((err, resp) => {
				if (err) {
					return callback(err);
				}
				if (resp.statusCode != 200) {
					return callback('Expected status 200 but got ' + resp.statusCode);
				}
				const witResponse = handleWitResponse(resp.body);
				return callback(null, witResponse);
			});
	};

};

module.exports = WitClient;
