import { signupUser, loginUser } from "../services/auth.service";
import { Request, Response } from "express";


export const signup = async(req: Request, res:Response)=>{
    
        const {name, email, password} = req.body
        const user = await signupUser({name, email, password})
        res.status(201).json({
            message: "user created ",
            user
        })
 

}

export const login = async(req: Request, res: Response)=>{
    
        const {email, password} = req.body
        const data = await loginUser(email, password)
        res.status(200).json({
            message: "login succesfull",
            ...data
        })
    
}