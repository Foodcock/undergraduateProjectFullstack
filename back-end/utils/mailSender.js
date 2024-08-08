const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const OAuth2 = google.auth.OAuth2;
require('dotenv').config();

const OAuth2_client = new OAuth2(
    process.env.MAIL_CLIENT_ID,
    process.env.MAIL_CLIENT_SECRET,
);

OAuth2_client.setCredentials({ refresh_token: process.env.MAIL_REFRESH_TOKEN });

function send_mail(email, isDelivery, message) {
    const accessToken = OAuth2_client.getAccessToken();

    const transport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            type: 'OAuth2',
            user: process.env.EMAIL,
            clientId: process.env.MAIL_CLIENT_ID,
            clientSecret: process.env.MAIL_CLIENT_SECRET,
            refreshToken: process.env.MAIL_REFRESH_TOKEN,
            accessToken: accessToken,
        },
    });

    const mail_options = {
        from: `<${process.env.EMAIL}>`,
        to: email,
        subject: isDelivery ? '訂單確認[外送]' : '訂單確認[外送]',
        html: `<h1>Message from system</h1><br>
        <p>${message}</p>`,
    };

    transport.sendMail(mail_options, function (error, result) {
        if (error) {
            console.log('Error: ', error);
        } else {
            console.log('Success: ', result);
        }
        transport.close();
    });
}

module.exports = { send_mail };