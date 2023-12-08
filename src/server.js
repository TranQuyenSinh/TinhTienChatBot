import express from 'express'

import configViewEngine from './config/viewEngine'
import initWebRoutes from './routes/web'
import bodyParser from 'body-parser'
require('dotenv').config()

const app = express()

configViewEngine(app)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

initWebRoutes(app)

const port = process.env.PORT || 8080

app.listen(port, () => {
    console.log('Chat bot đang chạy ở cổng:' + port)
})
