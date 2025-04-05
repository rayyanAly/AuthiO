import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: true, 
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SENDGRID_API_KEY,
    },
});

const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: "ibrahimdoodhwala40@gmail.com",
    subject: "Test Email",
    text: "HII This is a test email using SendGrid with port 465.",
};

transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.error("❌ Error sending email:", error);
    } else {
        console.log("✅ Email sent successfully:", info.response);
    }
});
