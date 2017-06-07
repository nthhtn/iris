'use strict';

const request = require('superagent');

module.exports.process = (intentData, registry, callback) => {
	if (intentData.intent[0].value !== 'time') {
		return callback(new Error(`Expected time intent, got ${intentData.intent[0].value}`));
	}
	if (!intentData.location) {
		return callback(new Error('Missing location in time intent'));
	}
	const location = intentData.location[0].value.replace(/,.?iris/i, '');
	const service = registry.get('time');
	if (!service) {
		return callback(null, 'No service available');
	}
	request.get(`http://${service.ip}:${service.port}/service/${location}`)
		.end((err, resp) => {
			if (err || resp.statusCode != 200 || !resp.body.result) {
				console.log(err);
				return callback(err, `I had a problem finding out the time in ${location}`);
			}
			return callback(null, `In ${location}, it is now ${resp.body.result}`);
		});
};
