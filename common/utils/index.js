'use strict';

const moment = require('moment');
const server = require('../../server/server');

module.exports = {
    markFacilityAsUpdated: async (id) => {
        const facility = await server.models.Facility.findById(id);
        const now = moment().format('YYYY-MM-DD HH:mm:ss');
        await facility.updateAttributes({ updated_at: now });
    }
}