const twilio = require('twilio');
require('dotenv').config()

const accountSid = process.env.ACCOUNT_SID
const authToken = process.env.AUTHTOKEN;

const client = twilio(accountSid, authToken);

exports.sendMessage = async (number, body) => {
    try {
        await client.messages.create({
            body: body,
            from: number.includes('whatsapp') ? 'whatsapp:+14155238886' : '+15074835249',
            to: number
        });
    }catch(err) {
        throw new Error(err.message);
    }
};



