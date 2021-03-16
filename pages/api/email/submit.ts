import { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // upgrade later with STARTTLS
    auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD
    }
});

async function wrapedSendMail(mailOptions) {
    return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log("error is " + error);
                reject(false); // or use rejcet(false) but then you will have to handle errors
            }
            else {
                console.log('Email sent: ' + info.response);
                resolve(true);
            }
        });
   })
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        const text: string = req.body.text as string
        const email: string = req.body.email as string
        const mailOptions = {
            from: process.env.MAIL_USERNAME,
            to: process.env.MAIL_RECEIVER,
            subject: process.env.MAIL_SUBJECT,
            text: `Email: ${email} \n Link: ${text}`
        };

        try {
            await wrapedSendMail(mailOptions)
        } catch (e) {
            return res.status(500).json({
                success: false,
                error: e
            })
        }
        return res.status(200).json({
            success: true,
        })
    }
    return res.end()
}
