const twilio = require('twilio');

const accountSid = 'ACaded7e05affc1eb1ba3bbf4a960c04ed';
const authToken = 'afaf0a93cd6e4b5e4d64abb068bdf709';

const client = twilio(accountSid, authToken);

exports.sendMessage = async (number, body) => {
    try {
        await client.messages.create({
            body: body,
            from: number.includes('whatsapp') ? 'whatsapp:+14155238886' : '+15074835249',
            to: number
        })
    } catch (error) {
        console.log(error)
    }
}



