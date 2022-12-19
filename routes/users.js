import { Router } from 'express'
import { login, register } from '../controllers/userAuthController.js'

const routes = Router()

/**
 * @swagger
 * asdadsdasd
 */
routes.post('/register', register);
routes.post('/login', login);



export default routes
