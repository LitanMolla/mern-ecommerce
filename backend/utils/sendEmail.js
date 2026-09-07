const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    service: "gmail",
    port: 587,
    secure: false,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
});

const sendEmail = async (email, token) => {
    try {
        const info = await transporter.sendMail({
            from: '"LITAN MOLLA" <litanmern@gmail.com>',
            to: email,
            subject: "Please verify your email",
            text: `Please verify your email by clicking the link below:

http://localhost:800/verify/${token}

This link will verify your email address.`,
        });

        console.log("Message sent: %s", info.messageId);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    } catch (err) {
        console.error("Error while sending mail:", err);
    }
}

module.exports = sendEmail