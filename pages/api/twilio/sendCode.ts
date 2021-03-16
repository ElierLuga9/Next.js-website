import { NextApiRequest, NextApiResponse} from 'next'
import { Twilio } from 'twilio'

const client = new Twilio(
  process.env.TWILIO_ACCOUNT_SID!,
  process.env.TWILIO_AUTH_TOKEN!
)

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        const phoneNumber:string = req.body.phoneNumber as string
        try {
            await client.verify.services(process.env.VERIFICATION_SID!)
                .verifications
                .create({ to: phoneNumber, channel: 'sms' })
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
