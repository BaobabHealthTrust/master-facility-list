'use strict';
const server = require("../../server/server");
const sgMail = require('@sendgrid/mail');

module.exports = function(Feedback) {

    Feedback.feedback = async function (data, cb) {
        const feedback = await server.models.Feedback.create(data);
        sgMail.setApiKey('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');
        const msg = {
            to: 'admin@kuunika.com',
            from: 'admin@kuunika.org',
            subject: 'Master Health Facility Registry feedback',
            text: data.message,
        };
        try {
            sgMail.send(msg);
        } catch (error) {
            // TODO: log the error or something
        }
        cb(null, feedback);
    }

    Feedback.remoteMethod('feedback', {
        accepts: { arg: 'data', type: 'object' },
        returns: { arg: 'response', type: 'object' }
    });
};
