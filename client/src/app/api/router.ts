import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { fullName, email, subject, message } = req.body;

        if (!fullName || !email || !subject || !message) {
            return res.status(400).json({ error: 'All fields are required.' });
        }

        try {
            const transporter = nodemailer.createTransport({
                service: 'gmail', 
                auth: {
                    user: process.env.EMAIL_USER, 
                    pass: process.env.EMAIL_PASS,
                },
            });

            await transporter.sendMail({
                from: `"${fullName}" <${email}>`,
                to: process.env.RECIPIENT_EMAIL,
                subject,
                text: message,
            });

            return res.status(200).json({ success: 'Email sent successfully!' });
        } catch (error) {
            console.error('Email sending error:', error);
            return res.status(500).json({ error: 'Failed to send email.' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
