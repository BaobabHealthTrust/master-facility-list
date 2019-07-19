'use strict';
const server = require("../../server/server");
const sgMail = require('@sendgrid/mail');
const nodemailer = require('nodemailer');
const juice = require('juice');
const htmlToText = require('html-to-text');
const { join } = require('path');
const pug = require('pug');


module.exports = function (Feedback) {
    Feedback.feedback = async function (data, cb) {
        await server.models.Feedback.create(data);
        const html = pug.renderFile(join(__dirname, '..', '..', `email-templates/feedback-template.pug`), {
            ...data,
        });
        const inlineHTML = juice(html);
        const text = htmlToText.fromString(inlineHTML);
        var transport = nodemailer.createTransport({
            host: process.env.MHFR_SMTP_HOST,
            port: process.env.MHFR_SMTP_PORT,
            auth: {
                user: process.env.MHFR_SMTP_USER,
                pass: process.env.MHFR_SMTP_USER_PASSWORD
            }
        });

        const mailOptions = {
            from: '"Kuunika" <admin@kuunika.org>',
            to: "bsmwalwanda@gmail.com",
            subject: "MHFR Feedback",
            text,
            html
        };

        transport.sendMail(mailOptions, (err, info) => {
            if (err) {
                console.log(err);
            }
            console.log('Email sent sucessfully');
        });
        // cb(null, feedback);
    }

    Feedback.remoteMethod('feedback', {
        accepts: { arg: 'data', type: 'object' },
        returns: { arg: 'response', type: 'object' }
    });
};
