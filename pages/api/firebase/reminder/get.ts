import { NextApiRequest, NextApiResponse } from 'next'
import firebaseDB from '../firebase'

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        const {
            phoneNumber = '',
        } = req.body

        try {
            let reminders_array = await firebaseDB
                .ref('reminders/'+phoneNumber)
                .once('value', async () => {})
            return res.status(200).json({
                success: true,
                reminders: reminders_array
            })
        } catch (e) {
            return res.status(500).json({
                success: false,
                error: e
            })
        }
    }
    return res.end()
}
