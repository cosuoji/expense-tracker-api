import { Router } from "express";
import * as expensesController from "../controllers/expensesController.js"
import { authMiddleware } from "../middleware/authMiddleware.js";
import { generateMiddleware } from "../middleware/generatedMiddleware.js";
import { expenseSchema } from "../validations/authValidations.js";



const expenseRoute = Router();
expenseRoute.get("/", authMiddleware, expensesController.getAllExpenses)
expenseRoute.post("/add", authMiddleware, generateMiddleware(expenseSchema), expensesController.addExpense)
expenseRoute.delete("/", authMiddleware, expensesController.deleteExpense)
expenseRoute.put("/", authMiddleware,  expensesController.updateExpense)

export default expenseRoute