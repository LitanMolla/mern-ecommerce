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
            text: `Please verify your email by clicking the link below: https://localhost:800/verify/${token}`,
        });

        console.log("Message sent: %s", info.messageId);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    } catch (err) {
        console.error("Error while sending mail:", err);
    }
}
const resetPasswordEmail = async (email, token) => {
    try {
        const info = await transporter.sendMail({
            from: '"LITAN MOLLA" <litanmern@gmail.com>',
            to: email,
            subject: "Reset your password",
            text: `Please reset your password by clicking the link below: https://localhost:800/reset-password/${token}`,
        });

        console.log("Message sent: %s", info.messageId);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    } catch (err) {
        console.error("Error while sending mail:", err);
    }
}

module.exports = { sendEmail, resetPasswordEmail }