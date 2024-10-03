
import { Router } from "express";
import {generateMiddleware} from "../middleware/generatedMiddleware.js"
import * as authController from "../controllers/authController.js"
import { loginSchema, registerSchema} from "../validations/authValidations.js";


const authRoute = Router()

authRoute.post('/login', generateMiddleware(loginSchema), authController.login)
authRoute.post("/register", generateMiddleware(registerSchema), authController.register)



export default authRoute