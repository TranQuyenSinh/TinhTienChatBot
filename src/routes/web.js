import express from 'express'
import chatbotController from '../controllers/chatbotController'

const router = express.Router()

const initWebRoutes = app => {
    router.get('/', chatbotController.getHomePage)
    router.get('/webhook', chatbotController.getWebHook)
    router.post('/webhook', chatbotController.postWebHook)

    return app.use('/', router)
}

export default initWebRoutes
