import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();

export async function sendCodeToPhone(phoneNumber: string) {
    let data: {[key:string]: string} = {
        phoneNumber: phoneNumber,
    }
    let result = await fetch(
        `${publicRuntimeConfig.basePath}/api/twilio/sendCode`,
        {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(data)
        }
    )
    return result.json()
}

export async function verifyCode(phoneNumber: string, code: string) {
    let data: {[key:string]: string} = {
        phoneNumber: phoneNumber,
        verificationCode: code,
    }
    let result = await fetch(
        `${publicRuntimeConfig.basePath}/api/twilio/verifyCode`,
        {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(data)
        }
    )
    return result.json()
}

export async function sendReminderToPhone(phoneNumber: string, message: string) {
    let data: {[key:string]: string} = {
        phoneNumber,
        message
    }
    let result = await fetch(
        `${process.env.HOSTNAME}/api/twilio/sendReminder`,
        {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(data)
        }
    )
    return result.json()
}