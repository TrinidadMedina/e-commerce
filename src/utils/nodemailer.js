const { createTransport } = require('nodemailer');

const adminMail = 'trinidad.medina.silva@gmail.com'

const transporter = createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: 'trinidad.medina.silva@gmail.com',
        pass: 'unjtdzvmwmdoikpm'
    }
 });

exports.sendMail = async (subject, html) => {
    const mailOptions = {
        from: 'Servidor Node.js',
        to: adminMail,
        subject: subject,
        html: html
     }
    try {
        await transporter.sendMail(mailOptions)
     } catch (err) {
        console.error(err)
     }
}


 
