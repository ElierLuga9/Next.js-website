import { NextApiRequest, NextApiResponse } from "next"
import moment from 'moment'
const fs = require('fs')
const ics = require('ics')
var validUrl = require('valid-url');

interface contentfulEvent {
    id: string,
    name: string,
    start: string,
    end: string,
    platform: string,
    category: string,
    subcategory: string,
    description: string,
    eventLink: string,
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        const event:contentfulEvent = req.body as contentfulEvent

        let start = moment().format('YYYY-M-D-H-m')
        .split("-").map(x => +x) as [number, number, number, number, number]
        start[3] = 0
        start[4] = 0
        if (event.start) {
            start = moment(event.start).format('YYYY-M-D-H-m')
            .split("-").map(x => +x) as [number, number, number, number, number]
        }

        let end = start.slice(0)
        end[3] += (start[3] <= 24) ? 1 : 0
        if (event.end) {
            end = moment(event.end).format('YYYY-M-D-H-m')
            .split("-").map(x => +x) as [number, number, number, number, number]
        }

        let calendarEvent = {
            start: start,
            end: end,
            title: event.name || 'Event',
            description: event.description || '',
            location: event.platform || '',
            url: validUrl.isUri(event.eventLink)? event.eventLink : '',
            categories: [] as string[],
        }
        if(event.category) {
            calendarEvent.categories.push(event.category)
        }
        if(event.subcategory) {
            calendarEvent.categories.push(event.subcategory)
        }

        try {
            await ics.createEvent(calendarEvent, async (error, value) => {
                if (error) {
                    console.log('error: ', error)
                    return res.status(500).json({
                        success: false,
                        error
                    })
                }

                await fs.writeFileSync(`./public/calendar/event_${event.id}.ics`, value)
                return res.status(200).json({
                    success: true,
                })
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