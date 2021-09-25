require('dotenv').config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const serviceId = process.env.SERVICE_ID;
const sendsms = (phone, message) => {
    const client = require('twilio')(accountSid, authToken);
    client.verify.services(serviceId)
        .verifications
        .create({
            body: message,
            from: process.env.TWILIO_PHONE_NUMBER,
            to: phone,
            channel: 'sms'
        })
        .then(message => console.log(message.sid));
    console.log(message, "message twillo")
}

module.exports = sendsms