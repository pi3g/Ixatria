// Easy way to consume a SSE stream, third-party library
import { EventSource } from 'eventsource'

const es = new EventSource("https://ixatria.com/api/v1.0/verification/session", {
    fetch: async (input, init) => await fetch(input, {
        ...init,
        headers: {
            ...init.headers,
            "x-api-key": "device-api-key",
        },
    }),
})

es.addEventListener("qr_code", (event) => {
    console.log(event.data.url)
    // You'll want to display this url as a qr code visible to the customer
    // -> Customer should then scan it and they will be sent to our website to do the verification from their phone
})

es.addEventListener("result", (event) => {
    console.log(event.data)
    // event.data will have this type:
    // { "success": boolean, "reason": string | undefined, "age": number | undefined }
    // reason is present if success is false
    // age is present if success is true
    // this event may be sent multiple times rapidly if the user is using video verification

    if (event.data.success) {
        // Once you recieve a successful result you can close the SSE socket
        // and approve / deny product vend depending on the age on the data
        es.close()
    }
})