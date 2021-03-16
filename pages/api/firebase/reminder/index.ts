import { NextApiRequest, NextApiResponse } from 'next'
import firebaseDB from '../firebase'

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'GET') {
        try {
            let reminders_array = await firebaseDB
                .ref('reminders')
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
