const { createTransport } = require('nodemailer');
require('dotenv').config();

const transporter = createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: 'trinidad.medina.silva@gmail.com',
        pass: process.env.PASS
    }
 });

exports.sendMail = async (subject, html) => {
    const mailOptions = {
        from: 'Servidor Node.js',
        to: process.env.ADMIN_MAIL,
        subject: subject,
        html: html
     }
    try {
        await transporter.sendMail(mailOptions)
     } catch (err) {
        throw new Error(err.message)
     }
}


 
