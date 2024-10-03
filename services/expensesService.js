import ErrorWithStatus from "../exceptions/errorStatus.js";
import { userId } from "../middleware/authMiddleware.js";
import User from "../database/schema/userSchema.js";
import Expense from "../database/schema/expenseSchema.js"

const categories = ["Groceries","Leisure","Electronics","Utilities","Clothing","Health","Others"]

export const getAllExpenses = async(start_date, end_date) =>{
    try {
        let userToDsiplay
        
        if(start_date && end_date){
            userToDsiplay = await Expense.find({userId: userId, date: {
                $gte:start_date,
                $lt: end_date
            }})
        } else {
            userToDsiplay = await Expense.find({userId: userId})
        }
        return{
            messages: userToDsiplay
        }

    } catch (error) {
        throw new ErrorWithStatus(error.message, 500)
    }
}

export const addExpense = async(expense, category,amount, date) =>{
    try {
        if(categories.includes(category)) {
            category
        } else{
            category = "Other"
        }
        const newExpense = new Expense({expense, category, amount, date, userId})
        await newExpense.save()
        return{
            message: "New Expense added"
        }
        
    } catch (error) {
        throw new ErrorWithStatus(error.message, 500)
    }
}

export const deleteExpense = async(expenseId) =>{
    try {
        const expenseToDelete = await Expense.findById(expenseId);
        if(!expenseToDelete)  throw new ErrorWithStatus("expense not found", 400)
        if(expenseToDelete.userId !== userId) throw new ErrorWithStatus("You don't have permission to edit this", 400)
        await Expense.findOneAndDelete({_id: expenseId})
        

        return{
            message: "Expense Deleted"
        }
        
    } catch (error) {
        throw new ErrorWithStatus(error.message, 500)
    }
}

export const updateExpense = async(expenseId,args) =>{
    try {

        if(categories.includes(args.category)) {
            args.category
        } else{
            args.category = "Other"
        }
        const expenseToDelete = await Expense.findById(expenseId);
        if(!expenseToDelete)  throw new ErrorWithStatus("expense not found", 400)
        if(expenseToDelete.userId !== userId) throw new ErrorWithStatus("You don't have permission to edit this", 400)
        await Expense.findOneAndUpdate({_id: expenseId}, {expense: args.expense, category: args.category, date: args.date, amount: args.amount})
        

        return{
            message: "Changes Saved"
        }
        
    } catch (error) {
        throw new ErrorWithStatus(error.message, 500)
    }
}