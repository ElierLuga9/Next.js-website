import { NextApiRequest, NextApiResponse } from 'next'
import { Twilio } from 'twilio'

const client = new Twilio(
  process.env.TWILIO_ACCOUNT_SID!,
  process.env.TWILIO_AUTH_TOKEN!
)

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const {
      verificationCode: code,
      phoneNumber,
    } = req.body;

    let verificationResult;

    try {
      verificationResult = await client.verify
        .services(process.env.VERIFICATION_SID!)
        .verificationChecks
        .create({ code, to: phoneNumber })
    } catch (e) {
      return res.status(500).json({
        success: false,
        error: e
      })
    }

    if (verificationResult.status === 'approved') {
      return res.status(200).json({
        success: true,
      })
    }

    let error = `Unable to verify code. status: ${verificationResult.status}`;
    return res.status(500).json({
      success: false,
      error
    });
  }
  return res.end()
}
