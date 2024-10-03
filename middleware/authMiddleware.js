import jwt from "jsonwebtoken"
import blacklist from "../database/schema/blacklistSchema.js";
import { tokenToUse} from "../controllers/authController.js"
import dotenv from "dotenv"
dotenv.config()
export let userId
const JWT_SECRET=process.env.JWT_SECRET


export const authMiddleware = async (req, res, next) =>{
        // set the retrieved token to authorization
    const authorization = tokenToUse;
    const checkIfBlackListed = await blacklist.findOne({token: tokenToUse});

    if(checkIfBlackListed){
        return res
            .status(401)
            .json({message: "This session has expired. Please login"})
            
    }


    if(!authorization){
        return res.status(401)
        .json({message: "Not Authorized to view expenses"})
    }

      jwt.verify(authorization, JWT_SECRET, (err, decoded)=>{
        if(err){
            return res.status(401)
            .json({message: "Unauthorized"})
        }     
        req.user = decoded
        userId = decoded._id
        next();
    })

}

