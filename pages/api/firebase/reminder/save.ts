import { NextApiRequest, NextApiResponse } from 'next'
import firebaseDB from '../firebase'

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        const {
            phoneNumber = '',
            eventId = 0,
            reminderTime = '',
            isReminderOn = true,
        } = req.body

        try {
            await firebaseDB
                .ref(`reminders/${phoneNumber}/${eventId}`)
                .set({
                    reminderTime: reminderTime,
                    isReminderOn: isReminderOn,
                })
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
