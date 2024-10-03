import * as  expensesService from "../services/expensesService.js"

export const getAllExpenses = async(req, res) =>{
    
    try {
       
        if(Object.keys(req.query).length > 0) {
            const {start_date, end_date} = req.query
            const result = await expensesService.getAllExpenses(start_date, end_date)
            res.json(result)
        } else{
            const result = await expensesService.getAllExpenses()
            res.json(result)
        }
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

export const addExpense = async(req, res) =>{
    try {
        const {expense, category, amount, date} = req.body
        const result = await expensesService.addExpense(expense, category,amount, date)
        res.json(result)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}


export const deleteExpense = async(req, res) =>{
    try {
        const {expenseId} = req.body 
        const result = await expensesService.deleteExpense(expenseId)
        res.json(result)      
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

export const updateExpense = async(req, res) =>{
    try {
        //We might not know what is sent to update, 
        //so we use the spread operator to collect data
        const {expenseId,...args} = req.body
        const result = await expensesService.updateExpense(expenseId, args)
        res.json(result)      
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}