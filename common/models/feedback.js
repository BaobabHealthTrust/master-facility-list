'use strict';
const server = require("../../server/server");

module.exports = function(Feedback) {

    Feedback.feedback = async (data, cb) => {
        return await data;
    }

    Feedback.remoteMethod('feedback', {
        accepts: [
            { arg: 'data', type: 'object' }
        ],
        returns: { arg: 'response', type: 'object' },
        http: { verb: 'post' }
    })
};
