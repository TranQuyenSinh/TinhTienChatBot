require('dotenv').config()

const VERIFY_TOKEN = process.env.VERIFY_TOKEN
const getHomePage = (req, res) => {
    return res.send('Xin chào')
}
const getWebHook = (req, res) => {
    let mode = req.query['hub.mode']
    let token = req.query['hub.verify_token']
    let challenge = req.query['hub.challenge']

    if (mode && token) {
        if (mode === 'subscribe' && token === VERIFY_TOKEN) {
            console.log('WEBHOOK_VERIFIED')
            res.status(200).send(challenge)
        } else {
            res.sendStatus(403)
        }
    }
}

const postWebHook = (req, res) => {
    let body = req.body

    if (body.object === 'page') {
        body.entry.forEach(entry => {
            let webhook_event = entry.messaging[0]
            console.log(webhook_event)
            let sender_psid = webhook_event.sender.id
            console.log('sender PSID: ' + sender_psid)
        })
        res.status(200).send('EVENT_RECEIVED')
    } else {
        res.sendStatus(404)
    }
}

export default { getHomePage, getWebHook, postWebHook }
