import { createClient } from 'contentful'
import moment from 'moment'

const client = createClient({
  space: process.env.CONTENTFUL_SPACE!,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!
})

const previewClient = createClient({
  space: process.env.CONTENTFUL_SPACE!,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
  host: process.env.CONTENTFUL_HOST!,
})

const getClient = (preview) => (preview ? previewClient : client)

function parseEvent({ fields, sys }) {
  return {
    id: sys.id,
    name: fields.nameOfEvent || "",
    nameOfEntity: fields.nameOfEntity || "",
    start: fields.eventStart || null,
    end: fields.eventEnd || null,
    platform: fields.platformName || "",
    category: fields.mainCategory || "",
    subcategory: fields.subCategory || "",
    description: fields.description || "",
    eventLink: fields.eventLink || "",
    eventType: fields.eventType || "",
    thumbImage: fields.thumbImage
  }
}

function parseEventEntries(entries, cb = parseEvent) {
  return entries?.items?.map(cb)
}

export async function getAllEventsForHome(preview) {
  const entries = await getClient(preview).getEntries({
    content_type: 'event',
  })
  const parsedEntries = parseEventEntries(entries)
  const sorted = parsedEntries.sort((a, b) => {
    return moment(a.start).diff(moment(b.start), 'minutes')
  })
  return sorted
}