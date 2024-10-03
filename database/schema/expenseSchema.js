import mongoose from "mongoose";


const expenseSchema = mongoose.Schema({
    expense: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        default: "Other",
        required: true,
    },
    amount:{
        type: Number, 
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    userId:{
        type:String,
    }
});

const Expense = mongoose.model("expense", expenseSchema)
export default Expense