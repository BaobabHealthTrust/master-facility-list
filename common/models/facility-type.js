'use strict';

module.exports = function(Facilitytype) {
	Facilitytype.Generate = function(num, cb) {
		Facilitytype.create({
			"facility_type": "Dispensary",
			"description": "Not really a facility",
		}).then( resp => {
			cb(null,resp);
		}).catch( err => {
			cb(err,null);
		});
	}

	Facilitytype.remoteMethod('Generate', {
		accepts: {arg: 'num', type: 'number'},
		returns: {arg: 'response', type: 'object'},
	});
};
