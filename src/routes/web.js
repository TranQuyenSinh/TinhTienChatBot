import express from 'express'
import chatbotController from '../controllers/chatbotController'

const router = express.Router()

const initWebRoutes = app => {
   router.get('/', chatbotController.getHomePage)
   router.get('/webhook', chatbotController.getWebHook)
   router.post('/webhook', chatbotController.postWebHook)
   router.get('/start', chatbotController.startLoop)
   router.get('/funcA', chatbotController.funcA)
   router.get('/funcB', chatbotController.funcB)
   router.get('/sayHello', chatbotController.sayHello)

   return app.use('/', router)
}

export default initWebRoutes
