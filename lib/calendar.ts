const generateUrl = require('generate-google-calendar-url')

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

export async function createCalendarEvent(event: contentfulEvent) {

    let response = await fetch(
        `${process.env.HOSTNAME}/api/calendar/download`,
        {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(event)
        }
    )
    return response.json()
}


export function getGoogleCalendarUrl(event: contentfulEvent):string {

    return generateUrl({
        start: new Date(event.start),
        end: new Date(event.end),
        title: event.name,
        location: event.platform,
        details: event.eventLink
    })

}