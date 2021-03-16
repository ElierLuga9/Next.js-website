import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();

export async function submitClass(email: string, text: string) {
    let data: {[key:string]: string} = {
        email,
        text,
    }
    let result = await fetch(
        `${publicRuntimeConfig.basePath}/api/email/submit`,
        {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(data)
        }
    )
    return result.json()
}