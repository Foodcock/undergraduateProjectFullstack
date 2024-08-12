const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const OAuth2 = google.auth.OAuth2;
const config = require('../mailConfig.js');

const OAuth2_client = new OAuth2(
    config.MAIL_CLIENT_ID,
    config.MAIL_CLIENT_SECRET,
);

OAuth2_client.setCredentials({ refresh_token: config.MAIL_REFRESH_TOKEN });

function send_mail(email, message) {
    OAuth2_client.getAccessToken((err, accessToken) => {
        if (err) {
            console.error('Failed to get access token:', err);
            return;
        }

        const transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: config.EMAIL,
                clientId: config.MAIL_CLIENT_ID,
                clientSecret: config.MAIL_CLIENT_SECRET,
                refreshToken: config.MAIL_REFRESH_TOKEN,
                accessToken: accessToken.token,
            },
        });

        const mail_options = {
            from: `<${config.EMAIL}>`,
            to: email,
            subject: `Message from 美味不浪費`,
            html: `
            <p>${message}</p>
            `,
        };

        transport.sendMail(mail_options, function (error, result) {
            if (error) {
                console.log('Error: ', error);
            } else {
                console.log('Success: ', result);
            }
            transport.close();
        });
    });

}

module.exports = {
    send_mail
};