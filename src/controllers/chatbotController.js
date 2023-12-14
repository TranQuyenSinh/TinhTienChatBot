import request from 'request'
require('dotenv').config()

const VERIFY_TOKEN = process.env.VERIFY_TOKEN
const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN
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
            let sender_psid = webhook_event.sender.id
            if (webhook_event.message) {
                handleMessage(sender_psid, webhook_event.message)
            } else if (webhook_event.postback) {
                handlePostback(sender_psid, webhook_event.postback)
            }
        })
        res.status(200).send('EVENT_RECEIVED')
    } else {
        res.sendStatus(404)
    }
}

const handleMessage = (sender_psid, received_message) => {
    let res
    if (received_message.text) {
        let result = calculate(received_message.text)
        res = {
            text: result,
        }
    }

    callSendAPI(sender_psid, res)
}

const formatNumer = num => {
    return Intl.NumberFormat('vi-VN').format(num)
}
const calculate = message => {
    let arr = message.split(' ')
    let types = arr.filter((item, index) => index % 2 != 0)
    let quantities = arr.filter((item, index) => index % 2 == 0)
    let result = ''
    let total = 0
    let amount = 0
    types.forEach((type, index) => {
        let quantity = quantities[index]
        switch (type) {
            case 'ml':
                amount = quantity * 85000
                result += `\nMè lớn: ${quantity} x ${formatNumer(85000)} = ${formatNumer(amount)}`
                break
            case 'mn':
                amount = quantity * 22000
                result += `\nMè nhỏ: ${quantity} x ${formatNumer(22000)} = ${formatNumer(amount)}`
                break
            case 't':
                amount = quantity * 50000
                result += `\nTrứng vịt: ${quantity} x ${formatNumer(50000)} = ${formatNumer(amount)}`
                break
        }
        total += amount
    })
    result += '\n=======================\nTổng: ' + formatNumer(total)
    return result
}

function callSendAPI(sender_psid, response) {
    // Construct the message body
    let request_body = {
        recipient: {
            id: sender_psid,
        },
        message: response,
    }

    // Send the HTTP request to the Messenger Platform
    request(
        {
            uri: 'https://graph.facebook.com/v2.6/me/messages',
            qs: { access_token: PAGE_ACCESS_TOKEN },
            method: 'POST',
            json: request_body,
        },
        (err, res, body) => {
            if (!err) {
                console.log('message sent!')
            } else {
                console.error('Unable to send message:' + err)
            }
        }
    )
}
export default { getHomePage, getWebHook, postWebHook }
