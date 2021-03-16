import { NextApiRequest, NextApiResponse } from 'next'
import firebaseDB from '../firebase'
import { getAllEventsForHome } from '../../../../lib/contentful'
import { sendReminderToPhone } from '../../../../lib/twilio'
import moment from 'moment'

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        try {
            let reminders_array = await firebaseDB
                .ref('reminders')
                .once('value', async () => {})

            const allEvents = await getAllEventsForHome(false)
            const today = moment().format('MM-DD-YYYY hh:mm')
            reminders_array.forEach(phoneNumber => {
                phoneNumber.forEach(reminder => {
                    let reminderTime = moment(reminder.val().reminderTime)
                        .subtract(10, "minutes")
                        .format('MM-DD-YYYY hh:mm')
                    console.log(reminderTime)
                    if(reminder.val().isReminderOn
                        && reminderTime === today) {
                        let event = allEvents.filter(event => event.id === reminder.key)

                        let message = `Kindly reminder for this upcoming event. \n
                            Event Name: ${event[0].name} \n
                            Start Time: ${moment(event[0].start).format('LLL')} \n
                            Description: ${event[0].description} \n
                            Platform: ${event[0].platform}
                        `
                        console.log('---send:', phoneNumber.key)
                        console.log(message)
                        console.log('--------------')

                        sendReminderToPhone(phoneNumber.key, message).then((result)=>{
                            if(result.success) {
                                firebaseDB
                                .ref(`reminders/${phoneNumber.key}/${reminder.key}`)
                                .set({
                                    isReminderOn: false,
                                    reminderTime: reminder.val().reminderTime
                                })
                            }
                        })
                    }
                })
            })

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
