'use strict';
const server = require("../../server/server");

module.exports = function(Feedback) {

    Feedback.feedback = async (data, cb) => {
        console.log(data);
        return {
            
        }
    }

    Feedback.remoteMethod('feedback', {
        accepts: [
            { arg: 'data', type: 'object' }
        ],
        returns: { arg: 'response', type: 'object' },
        http: { verb: 'post' }
    })
};
