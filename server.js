import express from "express";
import morgan from "morgan";
import dotenv from "dotenv"
import authRoute from "./routes/authRoutes.js";
import expenseRoute from "./routes/expensesRoutes.js";
import { connect } from "./database/schema/connection.js"
import httpLogger from "./logger/httplogger.js"

dotenv.config()
const app = express();
const PORT = process.env.PORT
const MONGODB_URI = process.env.MONGODB_URI
app.use(httpLogger)
app.use(express.json())
app.use(morgan('dev'))
app.use("/", authRoute)
app.use("/api/expenses", expenseRoute)



//catch other routes
app.all("*", (req, res )=>{
    res.status(404);
    res.json({
        message: "Not Found"
    })
})

connect(MONGODB_URI)
    .then(()=>{
        console.log("Connected to DB")
        app.listen(PORT, _ =>{
            console.log("expense API is running on PORT", PORT)
        })
    })

export default app