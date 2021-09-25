require('dotenv').config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const serviceId = process.env.SERVICE_ID;
const verify = (req, res, next) => {
    // console.log(req.body);
    // const { phone, code } = req.body
    const client = require('twilio')(accountSid, authToken);
    client.verify.services(serviceId)
        .verificationChecks
        .create({
            to: "+918779742206",
            code: "720583"
        })
        .then(verification_check => {
            console.log(verification_check)
            if (verification_check.status === approved) {
                res.status(200).json({

                    message: "Approved"
                })
            }
            else {
                res.status(400).json({
                    message: "not approved"
                })
            }

            console.log(verification_check.status,);
        });

}


module.exports = verify