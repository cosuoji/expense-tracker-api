import * as authService from "../services/authService.js"
export let tokenToUse, role



export const login = async (req, res, next)=>{
    try {
        const {username, password} = req.body;
        const token = await authService.login(username, password)
        tokenToUse = token.data.accessToken
        role = token.data.user

        if(tokenToUse){
            req.header.authorization = "Bearer" + tokenToUse
        }
        res.json(token)
    }
    catch(err){
        res.status(err.status || 500);
        res.json({message: err.message})
    }
}


export const register = async (req, res)=>{
    try {
    const {username,password} = req.body
    let result = await authService.register(username,password)
    res.json(result)
    }
    catch(err){
        res.status(err.status || 500);
        res.json({messsage: err.message}) 
    }
}



export const logout = async(req, res) =>{
    try{
        let result = await authService.logout(tokenToUse);
        res.json(result)
    } catch(err){
        res.status(err.status || 500);
        res.json({message: err.message})
    }
}