import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();

export async function getReminders(phoneNumber: string) {
    let data: {[key:string]: string} = {
        phoneNumber: phoneNumber,
    }
    let result = await fetch(
        `${publicRuntimeConfig.basePath}/api/firebase/reminder/get`,
        {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(data)
        }
    )
    return result.json()
}

export async function getAllReminders() {
    let result = await fetch(
        `${publicRuntimeConfig.basePath}/api/firebase/reminder/`
    )
    return result.json()
}

export async function saveReminder(phoneNumber: string,
    reminderTime: string, isReminderOn: boolean, eventId: string) {
    let data: {[key:string]: any} = {
        phoneNumber,
        reminderTime,
        isReminderOn,
        eventId,
    }
    let result = await fetch(
        `${publicRuntimeConfig.basePath}/api/firebase/reminder/save`,
        {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(data)
        }
    )
    return result.json()
}